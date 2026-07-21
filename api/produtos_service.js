import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProducts() {
    const { data: produtos, error } = await supabase
        .from('Produtos')
        .select('*');

    if (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }

    console.log('Produtos recebidos:', produtos);
    return produtos || [];
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
    // Buscar UUID da categoria (ex.: "Guitarra Elétrica")
    const { data: categoria, error: catError } = await supabase
        .from('Categoria')
        .select('id_categoria')
        .eq('nome_categoria', dadosProduto.categoria || 'Guitarra Elétrica')
        .single();

    if (catError || !categoria) {
        console.error('Categoria não encontrada:', catError?.message);
        return { success: false, error: 'Categoria não encontrada.' };
    }

    // Buscar UUID do fornecedor (ex.: "Gibson")
    const { data: fornecedor, error: fornError } = await supabase
        .from('Fornecedor')
        .select('id_fornecedor')
        .eq('nome_fornecedor', dadosProduto.fornecedor || 'Gibson')
        .single();

    if (fornError || !fornecedor) {
        console.error('Fornecedor não encontrado:', fornError?.message);
        return { success: false, error: 'Fornecedor não encontrado.' };
    }

    const produtoCompleto = {
        nome_produto: dadosProduto.nome_produto,
        preco: dadosProduto.preco,
        imagem_url: dadosProduto.imagem_url,
        estoque: dadosProduto.estoque || 10,
        id_categoria: categoria.id_categoria,
        id_fornecedor: fornecedor.id_fornecedor
    };

    const { data, error } = await supabase
        .from('Produtos')
        .insert([produtoCompleto])
        .select();

    if (error) {
        console.error('Erro ao cadastrar produto:', error.message);
        return { success: false, error: error.message };
    }

    console.log('Produto cadastrado com sucesso:', data);
    return { success: true, data };
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