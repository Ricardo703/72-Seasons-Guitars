// produto_detalhe_page/controller/detalhes.js
import { criarElementoDetalhes } from '.././view/detalhes_view.js';

async function adicionarAoCarrinho(produto) {
    await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    });
}

export function renderizarDetalhesDinamicamente(produto) {
    const root = document.getElementById('root-detalhes');
    if (!root) {
        console.error('Elemento #root-detalhes não encontrado.');
        return;
    }

    // Limpa o conteúdo atual
    root.innerHTML = '';

    // Cria o elemento via View
    const elemento = criarElementoDetalhes(produto);
    if (!elemento) return;

    const btnComprar = elemento.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', async () => {
            await adicionarAoCarrinho(produto);
            alert('Adicionado ao carrinho com sucesso!');
            if (typeof window.atualizarContadorHeader === 'function') {
                await window.atualizarContadorHeader();
            }
        });
    }



    // Insere no DOM
    root.appendChild(elemento);
}

// Fechar modal de detalhes (também é responsabilidade do controller)
document.getElementById('close-details-btn')?.addEventListener('click', () => {
    document.getElementById('details-modal').style.display = 'none';
});