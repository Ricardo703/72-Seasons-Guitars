// home_page/controller/home_page.js
import { obterQuantidadeBanners, moverBanner } from './banner.js';
import { createCards } from './cards.js';
import { initProductForms } from '../view/components/form_produto.js';
import { abrirDetalhesProduto, fecharDetalhesProduto } from '../view/components/product.js';
import { showModalCart, closeModalCart } from '../view/components/carrinho.js';

const cardsSection = document.getElementById('cards-section');

window.abrirDetalhesProduto = abrirDetalhesProduto;
window.fecharDetalhesProduto = fecharDetalhesProduto;
window.moverBanner = moverBanner;

window.showModalCart = showModalCart;
window.closeModalCart = closeModalCart;

document.addEventListener('DOMContentLoaded', () => {
    obterQuantidadeBanners();
    if (cardsSection) createCards(cardsSection);
    initProductForms();
});

