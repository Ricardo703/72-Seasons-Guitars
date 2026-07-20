// home_page/services/carrinho_service.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gkqcjyoekhavxalxnbes.supabase.co';
const supabaseKey = 'sb_publishable_ltt2HcP6t1vsBlEUAhUgvA_7YQBt_aV';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCarrinhoRemoto() {
    const { data, error } = await supabase.from('Carrinho').select('*');
    if (error) console.error('Erro ao buscar carrinho:', error);
    return data;
}

let carrinhoMemoria = [];

export function obterCarrinho() {
    return carrinhoMemoria;
}

export function adicionarAoCarrinho(produto) {
    const existente = carrinhoMemoria.find(item => item.id_produto === produto.id_produto);
    if (existente) {
        existente.quantidade += 1;
    } else {
        carrinhoMemoria.push({
            id_produto: produto.id_produto,
            nome_produto: produto.nome_produto,
            preco: produto.preco,
            imagem_url: produto.imagem_url,
            quantidade: 1
        });
    }
}

export function removerDoCarrinho(index) {
    carrinhoMemoria.splice(index, 1);
}

export function obterTotalItensCarrinho() {
    return carrinhoMemoria.reduce((total, item) => total + item.quantidade, 0);
}

export function limparCarrinho() {
    carrinhoMemoria = [];
}

export function obterPrecoTotal() {
    return carrinhoMemoria.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}