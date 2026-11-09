// Connects the game to the Supabase database.
// The game was first written for a different storage system, so this file translates its
// requests (read a document, save a document, watch for changes, take a short lock) into Supabase calls.

const MAX_DOC = 262144;

function snapDoc(id, data) {
  return {
    id,
    exists: data !== undefined && data !== null,
    data: () => (data === undefined || data === null ? undefined : JSON.parse(JSON.stringify(data))),
    metadata: { fromCache: false, hasPendingWrites: false },
  };
}
const fail = (error) => Promise.reject({ code: (error && error.code) || "error", message: (error && error.message) || "Database error" });
const idOf = (path) => path.slice(path.indexOf("/") + 1);
const colOf = (path) => path.slice(0, path.indexOf("/"));

export function makeClaude(sb, user, profile) {
  const POLL_MS = 8000;

  function watch(channelName, filter, refetch) {
    let stopped = false, timer = null, poll = null;
    const run = () => { if (stopped) return; clearTimeout(timer); timer = setTimeout(() => { if (!stopped) refetch(); }, 120); };
    let ch = null;
    try {
      ch = sb.channel(channelName + ":" + Math.random().toString(36).slice(2))
        .on("postgres_changes", { event: "*", schema: "public", table: "docs", filter }, run)
        .subscribe();
    } catch (e) { /* live updates are a bonus; polling below still works */ }
    poll = setInterval(run, POLL_MS);
    refetch();
    return () => { stopped = true; clearTimeout(timer); clearInterval(poll); try { if (ch) sb.removeChannel(ch); } catch (e) { /* ignore */ } };
  }

  function docRef(path) {
    const id = idOf(path);
    const read = async () => {
      const { data, error } = await sb.from("docs").select("data").eq("path", path).maybeSingle();
      if (error) throw error;
      return data ? data.data : undefined;
    };
    return {
      id, path,
      get: async () => { try { return snapDoc(id, await read()); } catch (e) { return fail(e); } },
      set: async (d) => {
        if (JSON.stringify(d).length > MAX_DOC) return Promise.reject({ code: "too_large", message: "Document too large" });
        const { error } = await sb.from("docs").upsert({ path, collection: colOf(path), data: d });
        if (error) return fail(error);
      },
      update: async (d) => {
        try { const cur = (await read()) || {}; const next = Object.assign({}, cur, d);
          if (JSON.stringify(next).length > MAX_DOC) return Promise.reject({ code: "too_large", message: "Document too large" });
          const { error } = await sb.from("docs").upsert({ path, collection: colOf(path), data: next }); if (error) return fail(error);
        } catch (e) { return fail(e); }
      },
      delete: async () => { const { error } = await sb.from("docs").delete().eq("path", path); if (error) return fail(error); },
      acquire: async (o) => {
        const { data, error } = await sb.rpc("acquire_lease", { p_path: path, p_holder: String(o.holder), p_ttl_ms: o.ttlMs || 1500 });
        if (error) return fail(error);
        return data;
      },
      onSnapshot: (next, onErr) => watch("doc:" + path, "path=eq." + path, async () => {
        try { next(snapDoc(id, await read())); } catch (e) { if (onErr) onErr(e); }
      }),
    };
  }

  function query(col, st) {
    st = st || {};
    const fetchSnap = async () => {
      let q = sb.from("docs").select("path,data").eq("collection", col);
      if (st.ob) q = q.order("data->" + st.ob, { ascending: st.dir !== "desc" }); else q = q.order("path", { ascending: true });
      if (st.lim) q = q.limit(st.lim);
      const { data, error } = await q;
      if (error) throw error;
      const docs = (data || []).map((r) => snapDoc(idOf(r.path), r.data));
      return { docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: { fromCache: false, hasPendingWrites: false } };
    };
    return {
      where: () => query(col, st),
      orderBy: (f, d) => query(col, Object.assign({}, st, { ob: f, dir: d || "asc" })),
      limit: (n) => query(col, Object.assign({}, st, { lim: n })),
      get: async () => { try { return await fetchSnap(); } catch (e) { return fail(e); } },
      onSnapshot: (next, onErr) => watch("col:" + col, "collection=eq." + col, async () => {
        try { next(await fetchSnap()); } catch (e) { if (onErr) onErr(e); }
      }),
      doc: (id) => docRef(col + "/" + (id || Math.random().toString(36).slice(2))),
      add: async (d) => { const r = docRef(col + "/" + Math.random().toString(36).slice(2)); await r.set(d); return r; },
    };
  }

  const db = { doc: docRef, collection: (p) => query(p) };
  const isOwner = !!(profile && profile.is_owner);
  const userApi = {
    isOwner: () => isOwner, canEdit: () => isOwner, can: () => true,
    id: () => Promise.resolve(user.id),
    me: () => Promise.resolve({ id: user.id, email: user.email || null }),
    profiles: async (ids) => {
      const out = {};
      try {
        const { data } = await sb.from("profiles").select("id,name,email").in("id", ids);
        (data || []).forEach((r) => { out[r.id] = { name: r.name || (r.email || "").split("@")[0] || "Player" }; });
      } catch (e) { /* fall through */ }
      ids.forEach((i) => { if (!out[i]) out[i] = { name: "Player" }; });
      return out;
    },
  };
  return { use: (n) => Promise.resolve(n === "db" ? db : n === "user" ? userApi : null) };
}
