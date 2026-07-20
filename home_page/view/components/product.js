import { renderizarDetalhesDinamicamente } from '../../../produto_detalhe_page/controller/detalhes.js';

export function abrirDetalhesProduto(produto) {
    renderizarDetalhesDinamicamente(produto);
    document.getElementById('details-modal').style.display = 'flex';
}

export function fecharDetalhesProduto() {
    document.getElementById('details-modal').style.display = 'none';
}