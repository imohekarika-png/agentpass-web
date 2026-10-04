import { createClient } from '@supabase/supabase-js';

// Hardcoded connection using your public URL and public Anon key
export const supabase = createClient(
  'https://iabrwesvmrukhjbdtoxt.supabase.co',
  'sb_publishable_daH4X7mS7Eo7i8paIIheCg_qSnKZfeS'
);