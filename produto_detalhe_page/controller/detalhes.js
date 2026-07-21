// produto_detalhe_page/controller/detalhes.js
import { criarElementoDetalhes } from '.././view/detalhes_view.js';
import { adicionarAoCarrinho } from '../../api/carrinho_service.js';

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

    // Adiciona evento ao botão de compra (agora no controller)
    const btnComprar = elemento.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            adicionarAoCarrinho(produto);
            alert('Adicionado ao carrinho com sucesso!');
            if (typeof window.atualizarContadorHeader === 'function') {
                window.atualizarContadorHeader();
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