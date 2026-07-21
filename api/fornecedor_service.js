import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getFornecedor() {
    // Aqui usamos 'fornecedor' tanto no data quanto no return
    const { data: fornecedor, error } = await supabase
        .from('Fornecedor')
        .select('*');

    if (error) {
        console.error('Erro ao buscar fornecedor:', error);
        return [];
    }

    return fornecedor;
}