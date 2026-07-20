import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gkqcjyoekhavxalxnbes.supabase.co';
const supabaseKey = 'sb_publishable_ltt2HcP6t1vsBlEUAhUgvA_7YQBt_aV';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getItensCarrinho() {
    // Se a tabela der erro de não encontrada, troque para 'itens carrinho' (com espaço em branco) dependendo de como está lá no seu Supabase
    const { data: itens, error } = await supabase.from('itens carrinho').select('*');
    if (error) console.error('Erro ao buscar itens carrinho:', error);
    return itens;
}
