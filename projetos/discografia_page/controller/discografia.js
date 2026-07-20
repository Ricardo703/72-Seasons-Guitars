import { renderCart } from '../../compras_page/controller/compras.js';
import { obterTotalItensCarrinho } from '../../home_page/services/carrinho_service.js';
import { DISCOGRAFIA_DB } from '../model/discografia_bd.js';

// =========================================================
// FUNÇÃO PARA ATUALIZAR O CONTADOR DO CARRINHO NO HEADER
// =========================================================
export function atualizarContadorHeader() {
    const totalItens = obterTotalItensCarrinho();
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItens;
    }
}

window.atualizarContadorHeader = atualizarContadorHeader;

// =========================================================
// FUNÇÃO PARA RENDERIZAR OS CARDS DE ÁLBUNS NA TELA
// =========================================================
function carregarDiscografia() {
    const discoGrid = document.querySelector('.discography-grid');
    if (!discoGrid) return;

    // Limpa o texto "Os álbuns entram aqui"
    discoGrid.innerHTML = '';

    // Percorre o BD e cria o HTML de cada card
    DISCOGRAFIA_DB.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';

        card.innerHTML = `
            <img src="${album.capa}" alt="Capa de ${album.titulo}" class="album-cover">
            <h3 class="album-title">${album.titulo}</h3>
            <p class="album-band">${album.banda}</p>
            <p class="album-year">${album.ano}</p>
            <a href="#" class="btn-album">Ver Músicas</a>
        `;

        discoGrid.appendChild(card);
    });
}

// =========================================================
// INICIALIZAÇÃO DA PÁGINA
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza os cards e o contador do header assim que a página abrir
    carregarDiscografia();
    atualizarContadorHeader();

    // Controle do Modal do Carrinho nesta tela
    const cartBtn = document.getElementById('header-cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('cart-modal').style.display = 'flex';

            const cartContainer = document.getElementById('cart-items-list');
            const summaryContainer = document.getElementById('summary-container');
            renderCart(cartContainer, summaryContainer);
        });
    }

    const closeCartBtn = document.getElementById('close-cart-btn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            document.getElementById('cart-modal').style.display = 'none';
        });
    }
});