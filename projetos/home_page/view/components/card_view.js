import { adicionarProdutoAoCarrinho } from './carrinho.js';

/**
 * Cria o card de um produto.
 * @param {Object} produto - Objeto do produto (com nome_produto, preco, imagem_url, etc.)
 * @returns {HTMLElement} Container do card pronto para ser inserido no DOM.
 */
export function criarCard(produto) {
    // 1. Container Principal
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    cardContainer.style.cursor = 'pointer';

    // 2. Efeito do Card
    const cardEffect = document.createElement('div');
    cardEffect.className = 'card-effect';

    // 3. Estrutura Interna
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';

    // 4. Elementos de Efeitos Visuais
    const cardLiquid = document.createElement('div');
    cardLiquid.className = 'card__liquid';
    const cardShine = document.createElement('div');
    cardShine.className = 'card__shine';
    const cardGlow = document.createElement('div');
    cardGlow.className = 'card__glow';

    // 5. Conteúdo do Card
    const cardContent = document.createElement('div');
    cardContent.className = 'card__content';

    // Badge
    const cardBadge = document.createElement('div');
    cardBadge.className = 'card__badge';
    cardBadge.textContent = 'TRENDING';

    // Imagem de Fundo
    const cardImage = document.createElement('div');
    cardImage.className = 'card__image';
    cardImage.style.backgroundImage = `url('${produto.imagem_url}')`;
    cardImage.style.backgroundSize = 'cover';
    cardImage.style.backgroundPosition = 'center';

    // Texto e Título
    const cardText = document.createElement('div');
    cardText.className = 'card__text';
    const cardTitle = document.createElement('p');
    cardTitle.className = 'card__title';
    cardTitle.textContent = produto.nome_produto;
    cardText.appendChild(cardTitle);

    // Rodapé
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card__footer';

    const cardPrice = document.createElement('div');
    cardPrice.className = 'card__price';
    cardPrice.textContent = `$${Number(produto.preco).toFixed(2)}`;

    // Botão de adicionar ao carrinho (SVG "+")
    const cardButton = document.createElement('div');
    cardButton.className = 'card__button';
    cardButton.style.cursor = 'pointer';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M5 12H19M12 5V19');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    svg.appendChild(path);
    cardButton.appendChild(svg);

    // Botão de editar (ícone de lápis)
    const cardEditButton = document.createElement('div');
    cardEditButton.className = 'card__edit-button';
    const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editSvg.setAttribute('viewBox', '0 0 24 24');
    editSvg.setAttribute('width', '16');
    editSvg.setAttribute('height', '16');
    const editPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    editPath.setAttribute('fill', 'currentColor');
    editPath.setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
    editSvg.appendChild(editPath);
    cardEditButton.appendChild(editSvg);

    // ================================================
    // EVENTOS (delegam para funções globais do window)
    // ================================================
    cardButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (typeof adicionarProdutoAoCarrinho === 'function') {
            adicionarProdutoAoCarrinho(produto, cardPrice, cardButton);
        }
    });

    cardEditButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (typeof abrirModalEdicao === 'function') {
            abrirModalEdicao(produto);
        }
    });

    cardContainer.addEventListener('click', () => {
        if (typeof abrirDetalhesProduto === 'function') {
            abrirDetalhesProduto(produto);
        }
    });

    // Montagem da árvore DOM
    cardFooter.appendChild(cardPrice);
    cardFooter.appendChild(cardEditButton);
    cardFooter.appendChild(cardButton);

    cardContent.appendChild(cardBadge);
    cardContent.appendChild(cardImage);
    cardContent.appendChild(cardText);
    cardContent.appendChild(cardFooter);

    cardInner.appendChild(cardLiquid);
    cardInner.appendChild(cardShine);
    cardInner.appendChild(cardGlow);
    cardInner.appendChild(cardContent);

    cardEffect.appendChild(cardInner);
    cardContainer.appendChild(cardEffect);

    return cardContainer;
}


export function criarCardAdicionar() {
    const addCardContainer = document.createElement('div');
    addCardContainer.className = 'card-container';
    addCardContainer.style.cursor = 'pointer';

    const addCardEffect = document.createElement('div');
    addCardEffect.className = 'card-effect';

    const addCardInner = document.createElement('div');
    addCardInner.className = 'card-inner card-inner--add';

    const addCardContent = document.createElement('div');
    addCardContent.className = 'card__content';
    addCardContent.style.justifyContent = 'center';
    addCardContent.style.alignItems = 'center';
    addCardContent.style.height = '100%';
    addCardContent.style.textAlign = 'center';

    const plusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    plusSvg.setAttribute('viewBox', '0 0 24 24');
    plusSvg.setAttribute('width', '48');
    plusSvg.setAttribute('height', '48');
    plusSvg.style.color = 'var(--card-accent)';
    plusSvg.style.marginBottom = '15px';
    const plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    plusPath.setAttribute('fill', 'currentColor');
    plusPath.setAttribute('d', 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z');
    plusSvg.appendChild(plusPath);

    const addText = document.createElement('p');
    addText.className = 'card__title';
    addText.textContent = 'Adicionar Produto';
    addText.style.fontSize = '1.2em';

    addCardContent.appendChild(plusSvg);
    addCardContent.appendChild(addText);
    addCardInner.appendChild(addCardContent);
    addCardEffect.appendChild(addCardInner);
    addCardContainer.appendChild(addCardEffect);

    addCardContainer.addEventListener('click', () => {
        if (typeof window.abrirModalCadastro === 'function') {
            window.abrirModalCadastro();
        }
    });

    return addCardContainer;
}