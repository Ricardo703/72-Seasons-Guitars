import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gkqcjyoekhavxalxnbes.supabase.co';
const supabaseKey = 'sb_publishable_ltt2HcP6t1vsBlEUAhUgvA_7YQBt_aV';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProducts() {
    const { data: produtos, error } = await supabase
        .from('Produtos')
        .select('*');

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];  // ← RETORNA ARRAY VAZIO em caso de erro
    }

    console.log('Produtos recebidos:', produtos);  // ← ajuda na depuração
    return produtos || [];  // ← garante que sempre retorna um array
}

export async function updateProduct(id, dadosAtualizados) {
    const { data, error } = await supabase
        .from('Produtos')
        .update(dadosAtualizados)
        .eq('id_produto', id)
        .select();

    if (error) {
        console.error('Erro ao atualizar produto no Supabase:', error);
        return null;
    }

    console.log('Produto atualizado com sucesso:', data);
    return data;
}

export async function addProduct(dadosProduto) {
    const { data, error } = await supabase
        .from('Produtos')
        .insert([dadosProduto])
        .select();

    if (error) {
        console.error('Erro ao cadastrar produto no Supabase:', error.message, error.details, error.hint);
        return null;
    }

    console.log('Produto cadastrado com sucesso:', data);
    return data;
}
export async function deleteProduct(id) {
    const { data, error } = await supabase
        .from('Produtos')
        .delete()
        .eq('id_produto', id)
        .select();

    if (error) {
        console.error('Erro ao deletar produto no Supabase:', error);
        return null;
    }

    console.log('Produto deletado com sucesso:', data);
    return data;
}
