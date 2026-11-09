import { makeClaude } from "../src/claudeShim.js";
// A tiny pretend Supabase that keeps rows in memory, so the connector can be checked without the internet.
function fakeSb() {
  const rows = new Map(), leases = new Map(), profiles = [{ id: "u1", name: "Ann", email: "a@x.com" }, { id: "u2", name: "Bo", email: "b@x.com" }];
  const subs = new Set();
  const ping = () => subs.forEach((f) => f());
  const builder = (table) => {
    const st = { f: [], ob: null, lim: null, op: "select", row: null, inn: null };
    const b = {
      select() { return b; }, eq(k, v) { st.f.push([k, v]); return b; }, in(k, v) { st.inn = [k, v]; return b; },
      order(c, o) { st.ob = [c, o && o.ascending !== false]; return b; }, limit(n) { st.lim = n; return b; },
      upsert(r) { st.op = "upsert"; st.row = r; return b; }, delete() { st.op = "delete"; return b; },
      maybeSingle() { return Promise.resolve(run(true)); }, then(res, rej) { return Promise.resolve(run(false)).then(res, rej); },
    };
    function run(single) {
      if (table === "profiles") { const d = profiles.filter((p) => !st.inn || st.inn[1].includes(p.id)); return { data: d, error: null }; }
      if (st.op === "upsert") { rows.set(st.row.path, { path: st.row.path, data: st.row.data, collection: st.row.path.split("/")[0] }); ping(); return { error: null }; }
      if (st.op === "delete") { st.f.forEach(([k, v]) => { if (k === "path") rows.delete(v); }); ping(); return { error: null }; }
      let d = [...rows.values()]; st.f.forEach(([k, v]) => { d = d.filter((r) => r[k] === v); });
      if (st.ob) { const key = st.ob[0].replace("data->", ""); d.sort((a, c) => ((st.ob[0].startsWith("data->") ? a.data[key] : a[st.ob[0]]) < (st.ob[0].startsWith("data->") ? c.data[key] : c[st.ob[0]]) ? -1 : 1) * (st.ob[1] ? 1 : -1)); }
      if (st.lim) d = d.slice(0, st.lim);
      return single ? { data: d[0] ? { data: d[0].data } : null, error: null } : { data: d, error: null };
    }
    return b;
  };
  return {
    from: builder,
    rpc: (fn, a) => { const now = Date.now(), c = leases.get(a.p_path); if (c && c.exp > now && c.holder !== a.p_holder) return Promise.resolve({ data: { acquired: false, expiresAt: "x" }, error: null }); leases.set(a.p_path, { holder: a.p_holder, exp: now + a.p_ttl_ms }); return Promise.resolve({ data: { acquired: true, expiresAt: "x" }, error: null }); },
    channel: () => { const ch = { on(_t, _o, cb) { ch.cb = cb; subs.add(cb); return ch; }, subscribe() { return ch; } }; return ch; },
    removeChannel: (ch) => subs.delete(ch.cb),
  };
}
let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log("FAIL", m); } else console.log("ok  ", m); };
const sb = fakeSb();
const cl = await makeClaude(sb, { id: "u1", email: "a@x.com" }, { is_owner: true }).use("db");
const us = await makeClaude(sb, { id: "u2", email: "b@x.com" }, { is_owner: false }).use("user");
const db = cl;
await db.doc("lg/state").set({ rev: 1, a: 1 });
ok((await db.doc("lg/state").get()).data().a === 1, "set then get");
await db.doc("lg/state").update({ b: 2 });
const g = (await db.doc("lg/state").get()).data(); ok(g.a === 1 && g.b === 2, "update merges");
ok(!(await db.doc("lg/nope").get()).exists, "missing doc does not exist");
await db.doc("lgl/g1").set({ w: 1 }); await db.doc("lgl/g2").set({ w: 3 }); await db.doc("lgl/g3").set({ w: 2 });
const top = await db.collection("lgl").orderBy("w", "desc").limit(2).get(); ok(top.docs.map((d) => d.id).join() === "g2,g3", "orderBy desc + limit");
const all = await db.collection("lg").get(); ok(all.size === 1 && all.docs[0].id === "state", "collection get");
const a1 = await db.doc("x/y").acquire({ holder: "u1", ttlMs: 1500 }), a2 = await db.doc("x/y").acquire({ holder: "u2", ttlMs: 1500 });
ok(a1.acquired && !a2.acquired, "lease blocks second holder");
let seen = 0; const off = db.collection("lg").onSnapshot((s) => { seen = s.size; }); await new Promise((r) => setTimeout(r, 300)); ok(seen === 1, "snapshot initial");
await db.doc("lg/seats").set({ z: 1 }); await new Promise((r) => setTimeout(r, 400)); ok(seen === 2, "snapshot sees new doc"); off();
await db.doc("lg/seats").delete(); ok(!(await db.doc("lg/seats").get()).exists, "delete");
const big = "x".repeat(300000); let rej = null; await db.doc("lg/big").set({ big }).catch((e) => { rej = e; }); ok(rej && rej.code === "too_large", "oversize rejected");
const pr = await us.profiles(["u1", "u9"]); ok(pr.u1.name === "Ann" && pr.u9.name === "Player", "profiles with fallback");
ok(us.isOwner() === false, "member is not owner"); ok((await us.me()).email === "b@x.com", "me() has email");
console.log(bad ? "FAILED " + bad : "ALL PASSED"); process.exit(bad ? 1 : 0);
