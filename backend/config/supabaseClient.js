import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabaseKey=process.env.SUPABASE_KEY;
const supabaseUrl=process.env.SUPABASE_URL;

if(!supabaseKey||!supabaseUrl){
    throw new error("Missing supabase key or url!")
}
export const supabase=createClient(supabaseUrl,supabaseKey)