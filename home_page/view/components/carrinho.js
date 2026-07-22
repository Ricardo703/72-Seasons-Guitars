// home_page/controller/carrinho_controller.js
import { renderCart } from '../../../compras_page/controller/compras.js';

async function obterTotalItensCarrinho() {
    const response = await fetch('/api/carrinho');
    const itens = await response.json();
    return itens.reduce((total, item) => total + item.quantidade, 0);
}

async function adicionarAoCarrinho(produto) {
    await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });
}

export async function atualizarContadorHeader() {
    const totalItens = await obterTotalItensCarrinho();
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = totalItens;
}

export async function adicionarProdutoAoCarrinho(produto, cardPriceElement, cardButtonElement) {
    await adicionarAoCarrinho(produto);
    const precoOriginal = cardPriceElement.textContent;
    cardPriceElement.textContent = 'Adicionado! ⚡';
    cardPriceElement.style.color = '#ffc800';
    cardButtonElement.style.pointerEvents = 'none';
    setTimeout(() => {
        cardPriceElement.textContent = precoOriginal;
        cardPriceElement.style.color = '';
        cardButtonElement.style.pointerEvents = 'auto';
    }, 1500);
    await atualizarContadorHeader();
}

export function showModalCart() {
    document.getElementById('cart-modal').style.display = 'flex';
    renderCart(
        document.getElementById('cart-items-list'),
        document.getElementById('summary-container')
    );
}

export function closeModalCart() {
    document.getElementById('cart-modal').style.display = 'none';
}
