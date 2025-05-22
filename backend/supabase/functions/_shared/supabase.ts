import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const createSupabaseClient = (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  const apiKey = req.headers.get('apikey') || Deno.env.get('SUPABASE_ANON_KEY');
  const url = Deno.env.get('SUPABASE_URL') || '';

  if (!url) {
    throw new Error('Missing SUPABASE_URL environment variable');
  }

  return createClient(url, apiKey, {
    global: {
      headers: {
        Authorization: authHeader || '',
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}; 