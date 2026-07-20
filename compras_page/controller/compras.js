import { obterCarrinho, removerDoCarrinho } from '../../home_page/services/carrinho_service.js';

export function renderCart(cartContainer, summaryContainer) {
    // 1. Limpa o container antes de renderizar para não duplicar itens antigos
    cartContainer.innerHTML = '';

    // 2. Lê os produtos salvos no seu novo Model (SEM LOCALSTORAGE)
    const produtosNoCarrinho = obterCarrinho();
    console.log(produtosNoCarrinho);
    let subtotal = 0;

    // 3. Loop usando forEach (evita o bug de escopo do índice 'i' após a primeira deleção)
    produtosNoCarrinho.forEach((produto, index) => {
        // Cria o elemento do item do carrinho
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Imagem do produto
        const itemImage = document.createElement('div');
        itemImage.className = 'cart-item__image';
        itemImage.style.backgroundImage = `url('${produto.imagem_url}')`;

        // Detalhes textuais
        const itemInfo = document.createElement('div');
        itemInfo.className = 'cart-item__info';
        const itemTitle = document.createElement('h3');
        itemTitle.textContent = produto.nome_produto;
        const itemPrice = document.createElement('p');
        itemPrice.className = 'price';
        itemPrice.textContent = produto.preco;

        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemPrice);

        // Ações Laterais (Botão Remover)
        const itemActions = document.createElement('div');
        itemActions.className = 'cart-item__actions';
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remover';
        removeBtn.style.cursor = 'pointer';

        // =========================================================
        // LÓGICA DE CLIQUE PARA REMOVER O ITEM VIA MODEL
        // =========================================================
        removeBtn.addEventListener('click', () => {
            // Remove o item chamando a função do Model
            removerDoCarrinho(index);

            // Re-renderiza a tela com o carrinho atualizado
            renderCart(cartContainer, summaryContainer);

            // Avisa o cabeçalho global para atualizar o contador
            if (typeof window.atualizarContadorHeader === 'function') {
                window.atualizarContadorHeader();
            }
        });


        itemActions.appendChild(removeBtn);

        // Montagem do Item
        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(itemActions);

        // Inserção no container da tela
        cartContainer.appendChild(cartItem);

        // Somador de preços para o subtotal (agora à prova de falhas)
        const precoTexto = String(produto.preco); // Garante que seja um texto
        const valorNumerico = parseFloat(precoTexto.replace(/[^0-9.-]+/g, ""));

        if (!isNaN(valorNumerico)) {
            // Multiplica o valor pela quantidade do produto que está no carrinho
            subtotal += (valorNumerico * produto.quantidade);
        }

    });

    // 4. Atualiza o resumo lateral injetando o HTML dinâmico
    const valorFormatado = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    summaryContainer.innerHTML = `
        <h2 class="cart-section-title">RESUMO</h2>
        <div class="summary-box">
            <div class="summary-row">
                <span>Subtotal</span>
                <span id="summary-subtotal">${valorFormatado}</span>
            </div>
            <div class="summary-row">
                <span>Frete</span>
                <span class="free-shipping">GRÁTIS</span>
            </div>
            <div class="summary-row total-row">
                <span>TOTAL</span>
                <span id="summary-total" class="yellow-glow-text">${valorFormatado}</span>
            </div>
            <button class="checkout-btn">FINALIZAR COMPRA</button>
        </div>
    `;
}
