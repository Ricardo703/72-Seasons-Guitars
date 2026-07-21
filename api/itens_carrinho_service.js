import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getItensCarrinho() {
    // Se a tabela der erro de não encontrada, troque para 'itens carrinho' (com espaço em branco) dependendo de como está lá no seu Supabase
    const { data: itens, error } = await supabase.from('itens carrinho').select('*');
    if (error) console.error('Erro ao buscar itens carrinho:', error);
    return itens;
}
