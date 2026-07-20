import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gkqcjyoekhavxalxnbes.supabase.co';
const supabaseKey = 'sb_publishable_ltt2HcP6t1vsBlEUAhUgvA_7YQBt_aV';

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