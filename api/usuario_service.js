import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getUsuario() {
    const { data: usuario, error } = await supabase.from('Usuario').select('*');
    if (error) console.error('Erro ao buscar usuario:', error);
    return usuario;
}