import { renderCart } from './compras.js';
document.addEventListener('DOMContentLoaded', () => {
    const listaItens = document.getElementById('cart-items-list');
    const summaryContainer = document.getElementById('summary-container');
    renderCart(listaItens, summaryContainer);
});