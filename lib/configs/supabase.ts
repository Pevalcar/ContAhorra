import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nftcuzxvbqzaomqxjnly.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mdGN1enh2YnF6YW9tcXhqbmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1OTM2OTcsImV4cCI6MjA0MzE2OTY5N30.VU6zbVM4Loo26WI7V-AODJnoGeLA-BBd3lmgEw04Rv0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
