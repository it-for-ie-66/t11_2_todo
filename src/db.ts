import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";
// Supabase client
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
