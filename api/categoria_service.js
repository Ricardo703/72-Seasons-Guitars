import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCategoria() {
    const { data: categoria, error } = await supabase.from('Categoria').select('*');
    if (error) console.error('Erro ao buscar categoria:', error);
    return categoria;
}