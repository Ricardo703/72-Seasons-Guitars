// home_page/controller/carrinho_controller.js
import { renderCart } from '../../../compras_page/controller/compras.js';
import { obterTotalItensCarrinho, adicionarAoCarrinho } from '../../services/carrinho_service.js';

export function atualizarContadorHeader() {
    const totalItens = obterTotalItensCarrinho();
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) cartCountSpan.textContent = totalItens;
}

export function adicionarProdutoAoCarrinho(produto, cardPriceElement, cardButtonElement) {
    adicionarAoCarrinho(produto);
    const precoOriginal = cardPriceElement.textContent;
    cardPriceElement.textContent = 'Adicionado! ⚡';
    cardPriceElement.style.color = '#ffc800';
    cardButtonElement.style.pointerEvents = 'none';
    setTimeout(() => {
        cardPriceElement.textContent = precoOriginal;
        cardPriceElement.style.color = '';
        cardButtonElement.style.pointerEvents = 'auto';
    }, 1500);
    atualizarContadorHeader();
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