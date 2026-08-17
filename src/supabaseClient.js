import { createClient } from '@supabase/supabase-js'

// SupabaseのProject URLとPublishable keyは.envで管理する（リポジトリにはコミットしない）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
