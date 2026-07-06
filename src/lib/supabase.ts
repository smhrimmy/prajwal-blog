import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://whidnmqwdplqxrsaixum.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_eF17tmPimtsusvnKKRLy1g_fK7ePuoG'

export const supabase = createClient(supabaseUrl, supabaseKey)
