import { createClient } from '@supabase/supabase-js';

// Retrieve credentials dynamically from environment variables or custom in-app configuration
export const getSupabaseConfig = () => {
  const envUrl = process.env.REACT_APP_SUPABASE_URL;
  const envKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
  const customUrl = localStorage.getItem('sbc_supabase_url');
  const customKey = localStorage.getItem('sbc_supabase_key');

  const rawUrl = (customUrl || envUrl || '').trim();
  const rawKey = (customKey || envKey || '').trim();

  const supabaseUrl = rawUrl.replace(/^["']|["']$/g, '');
  const supabaseKey = rawKey.replace(/^["']|["']$/g, '');

  const isConfigured = Boolean(
    supabaseUrl && 
    supabaseKey && 
    supabaseUrl.startsWith('https://') &&
    supabaseKey.length > 15
  );

  return { supabaseUrl, supabaseKey, isConfigured };
};

let clientInstance = null;

export const initSupabaseClient = () => {
  const { supabaseUrl, supabaseKey, isConfigured } = getSupabaseConfig();
  if (isConfigured) {
    try {
      clientInstance = createClient(supabaseUrl, supabaseKey);
      return clientInstance;
    } catch (e) {
      console.warn('Supabase initialization warning:', e);
      return null;
    }
  }
  return null;
};

export const getSupabase = () => {
  if (!clientInstance) {
    clientInstance = initSupabaseClient();
  }
  return clientInstance;
};

export const setSupabaseConfig = (url, key) => {
  if (url) localStorage.setItem('sbc_supabase_url', url.trim());
  else localStorage.removeItem('sbc_supabase_url');

  if (key) localStorage.setItem('sbc_supabase_key', key.trim());
  else localStorage.removeItem('sbc_supabase_key');

  clientInstance = null;
  return initSupabaseClient();
};

export default getSupabase;
