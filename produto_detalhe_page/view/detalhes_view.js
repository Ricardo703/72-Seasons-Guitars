export function criarElementoDetalhes(produto) {
    if (!produto) {
        console.error('Produto inválido para detalhes.');
        return null;
    }

    const container = document.createElement('div');
    container.className = 'container-produto';

    // Coluna esquerda – galeria e descrição
    const colEsquerda = document.createElement('div');
    colEsquerda.className = 'coluna-esquerda';

    const galeriaFotos = document.createElement('div');
    galeriaFotos.className = 'galeria-fotos';

    const img = document.createElement('img');
    img.src = produto.imagem_url;
    img.alt = produto.nome_produto;
    galeriaFotos.appendChild(img);

    const descricao = document.createElement('div');
    descricao.className = 'descricao-produto';
    const textoDescricao = produto.descricao || 'Guitarra profissional de alta performance.';
    descricao.innerHTML = `<h2>Descrição</h2><p>${textoDescricao}</p>`;

    colEsquerda.appendChild(galeriaFotos);
    colEsquerda.appendChild(descricao);

    // Coluna direita – informações de compra
    const colDireita = document.createElement('div');
    colDireita.className = 'coluna-direita';

    const statusVenda = document.createElement('p');
    statusVenda.className = 'status-venda';
    statusVenda.textContent = 'Pronta Entrega';

    const titulo = document.createElement('h1');
    titulo.textContent = produto.nome_produto;

    const precoDiv = document.createElement('div');
    precoDiv.className = 'bloco-preco';
    precoDiv.innerHTML = `<div id="preco-produto">$${Number(produto.preco).toFixed(2)}</div>`;

    const envio = document.createElement('p');
    envio.className = 'envio';
    envio.textContent = '🚚 Envio para todo o país';

    const btnComprar = document.createElement('button');
    btnComprar.className = 'btn-comprar';
    btnComprar.textContent = 'Adicionar ao Carrinho';

    colDireita.appendChild(statusVenda);
    colDireita.appendChild(titulo);
    colDireita.appendChild(precoDiv);
    colDireita.appendChild(envio);
    colDireita.appendChild(btnComprar);

    container.appendChild(colEsquerda);
    container.appendChild(colDireita);

    return container;
}