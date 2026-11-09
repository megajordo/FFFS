import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./index.css";
import App from "./League.jsx";
import { makeClaude } from "./claudeShim.js";
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });
const C = { bg: "#12151B", panel: "#1A1F28", line: "#2B3240", text: "#EDEFF3", muted: "#8B93A5", gold: "#D9A82B", red: "#E0736B", teal: "#39A896" };

function Shell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, display: "grid", placeItems: "center", padding: 16, fontFamily: "Oswald, system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>{children}</div>
    </div>
  );
}
const input = { width: "100%", boxSizing: "border-box", padding: "12px 12px", background: "#0E1218", color: C.text, border: `1px solid ${C.line}`, borderRadius: 6, fontSize: 16, fontFamily: "inherit" };

function SignIn() {
  const [mode, setMode] = useState("in");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [name, setName] = useState("");
  const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  const go = async (e) => {
    e.preventDefault(); setBusy(true); setMsg("");
    try {
      if (mode === "up") {
        const { data, error } = await sb.auth.signUp({ email: email.trim(), password, options: { data: { name: name.trim() } } });
        if (error) throw error;
        if (!data.session) setMsg("Account created. Check your email for a confirmation link, then come back and sign in.");
      } else {
        const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      }
    } catch (err) { setMsg(/failed to fetch|network/i.test(err.message || "") ? "Cannot reach the game server. Check your internet connection and try again." : err.message || "Something went wrong. Please try again."); }
    setBusy(false);
  };
  return (
    <Shell>
      <div style={{ fontFamily: "Anton, Impact, sans-serif", fontSize: 40, lineHeight: 1.05, textTransform: "uppercase", letterSpacing: "0.02em" }}>Fan Fiction Fantasy Stars</div>
      <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.5, margin: "8px 0 20px" }}>{mode === "in" ? "Sign in to your league." : "Create your manager account."}</p>
      <form onSubmit={go} style={{ display: "grid", gap: 10, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: 16 }}>
        {mode === "up" && <input style={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />}
        <input style={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        <input style={input} type="password" placeholder="Password (at least 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "in" ? "current-password" : "new-password"} minLength={6} required />
        <button disabled={busy} style={{ padding: "12px 14px", background: C.gold, color: "#12151B", border: 0, borderRadius: 6, fontSize: 16, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>{busy ? "One moment" : mode === "in" ? "Sign in" : "Create account"}</button>
        {msg && <div style={{ color: msg.startsWith("Account created") ? C.teal : C.red, fontSize: 14, lineHeight: 1.4 }}>{msg}</div>}
      </form>
      <button onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(""); }} style={{ marginTop: 14, background: "none", border: 0, color: C.muted, fontSize: 14, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}>
        {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </Shell>
  );
}

function Root() {
  const [state, setState] = useState({ phase: "loading" });
  useEffect(() => {
    let alive = true;
    const apply = async (session) => {
      if (!alive) return;
      if (!session) { delete window.claude; setState({ phase: "out" }); return; }
      let profile = null;
      for (let i = 0; i < 5 && !profile; i++) {
        const { data } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
        profile = data; if (!profile) await new Promise((r) => setTimeout(r, 400));
      }
      if (!alive) return;
      window.claude = makeClaude(sb, session.user, profile || {});
      setState({ phase: "in", uid: session.user.id, name: (profile && profile.name) || session.user.email });
    };
    sb.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((evt, session) => { if (evt === "SIGNED_IN" || evt === "SIGNED_OUT") apply(session); });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);
  if (state.phase === "loading") return <Shell><div style={{ color: C.muted }}>Loading</div></Shell>;
  if (state.phase === "out") return <SignIn />;
  return (
    <>
      <App key={state.uid} />
      <button onClick={() => sb.auth.signOut()} title={"Signed in as " + state.name} style={{ position: "fixed", right: 10, bottom: 10, zIndex: 50, background: C.panel, color: C.muted, border: `1px solid ${C.line}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Sign out</button>
    </>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
