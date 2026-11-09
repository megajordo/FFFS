// These two values are public by design: they only identify the project.
// Real protection comes from the database safety rules in supabase/schema.sql.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://wgxkpeppevssbhzsdytg.supabase.co";
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || "sb_publishable_YjGkFG0bgIo-Et_utlsv1w_9rLOps7s";
