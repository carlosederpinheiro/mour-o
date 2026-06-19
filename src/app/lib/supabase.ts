import { createClient } from '@supabase/supabase-js';

// Usando as mesmas chaves do projeto MouraoScrum
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://enamvoamthbfimtsvgqa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_CpzqeLlInSe81L1Sq46rQQ_NJSmTnP1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
