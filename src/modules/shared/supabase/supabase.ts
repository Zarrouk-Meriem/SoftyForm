import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jqjhjdczamcwscpfhcxi.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
