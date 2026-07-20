import { DISCOGRAFIA_DB } from '../model/discografia_bd.js';

// =========================================================
// FUNÇÃO PARA RENDERIZAR OS CARDS DE ÁLBUNS NA TELA
// =========================================================
function carregarDiscografia() {
    const discoGrid = document.querySelector('.discography-grid');
    if (!discoGrid) return;

    // Limpa o texto "Os álbuns entram aqui" ou qualquer lixo
    discoGrid.innerHTML = '';

    // Percorre o BD e cria o HTML de cada card
    DISCOGRAFIA_DB.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';

        card.innerHTML = `
            <img src="${album.capa}" alt="Capa de ${album.titulo}" class="album-cover">
            <h3 class="album-title">${album.titulo}</h3>
            <p class="album-band">${album.banda}</p>
            <p class="album-year">${album.ano}</p>        `;

        discoGrid.appendChild(card);
    });
}

// Chama a função direto, sem o DOMContentLoaded
carregarDiscografia();
