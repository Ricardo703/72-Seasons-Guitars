// home_page/view/components/form_produto.js (ajuste o caminho se necessário)
import { updateProduct, deleteProduct, addProduct } from '../../../api/produtos_service.js';
import { createCards } from '../../controller/cards.js';

let cardsSection;

// =========================================================
// FUNÇÕES GLOBAIS (chamadas pela cardView)
// =========================================================
window.abrirModalEdicao = function (produto) {
    document.getElementById('edit-product-id').value = produto.id_produto;
    document.getElementById('edit-product-name').value = produto.nome_produto;
    document.getElementById('edit-product-price').value = produto.preco;
    document.getElementById('edit-product-image').value = produto.imagem_url;
    document.getElementById('edit-modal').style.display = 'flex';
};

window.abrirModalCadastro = function () {
    document.getElementById('add-modal').style.display = 'flex';
};

// =========================================================
// INICIALIZAÇÃO DOS EVENTOS DOS FORMULÁRIOS
// =========================================================
export function initProductForms() {
    cardsSection = document.getElementById('cards-section');

    // Fechar modais pelos botões "X"
    document.getElementById('close-edit-btn')?.addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });
    document.getElementById('close-add-btn')?.addEventListener('click', () => {
        document.getElementById('add-modal').style.display = 'none';
    });

    // Editar produto
    const editProductForm = document.getElementById('edit-product-form');
    if (editProductForm) {
        editProductForm.addEventListener('submit', handleEditProduct);
    }

    // Cadastrar produto
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }

    // Excluir produto
    const deleteProductBtn = document.getElementById('delete-product-btn');
    if (deleteProductBtn) {
        deleteProductBtn.addEventListener('click', handleDeleteProduct);
    }

    console.log('📝 Product Forms Controller Ready');
}

// =========================================================
// HANDLERS
// =========================================================
async function handleEditProduct(e) {
    e.preventDefault();
    const id = document.getElementById('edit-product-id').value;
    const nome_produto = document.getElementById('edit-product-name').value;
    const preco = parseFloat(document.getElementById('edit-product-price').value);
    const imagem_url = document.getElementById('edit-product-image').value;

    const resultado = await updateProduct(id, { nome_produto, preco, imagem_url });
    if (resultado) {
        alert('Produto atualizado com sucesso! ⚡');
        document.getElementById('edit-modal').style.display = 'none';
        if (cardsSection) {
            cardsSection.innerHTML = '';
            createCards(cardsSection);
        }
    } else {
        alert('Erro ao atualizar o produto.');
    }
}

async function handleAddProduct(e) {
    e.preventDefault();
    const nome_produto = document.getElementById('add-product-name').value;
    const preco = parseFloat(document.getElementById('add-product-price').value);
    const imagem_url = document.getElementById('add-product-image').value;

    // ⚠️ Campos obrigatórios no banco: estoque, id_categoria, id_fornecedor
    const dadosProduto = {
        nome_produto,
        preco,
        imagem_url,
        estoque: 10,          // valor padrão – ajuste conforme necessário
        id_categoria: 1,      // ⚠️ verifique se o ID existe na tabela Categoria
        id_fornecedor: 1      // ⚠️ verifique se o ID existe na tabela Fornecedor
    };

    const addProductForm = document.getElementById('add-product-form');
    const resultado = await addProduct(dadosProduto);

    // Seu serviço retorna { success, data } ou { success: false, error }
    if (resultado && resultado.success) {
        alert('Produto cadastrado com sucesso! ⚡');
        document.getElementById('add-modal').style.display = 'none';
        if (addProductForm) addProductForm.reset();
        if (cardsSection) {
            cardsSection.innerHTML = '';
            createCards(cardsSection);
        }
    } else {
        alert(`Erro ao cadastrar: ${resultado?.error || 'Verifique os dados.'}`);
    }
}

async function handleDeleteProduct() {
    const id = document.getElementById('edit-product-id').value;
    const nome = document.getElementById('edit-product-name').value;
    if (confirm(`Excluir "${nome}"?`)) {
        const resultado = await deleteProduct(id);
        if (resultado) {
            alert('Produto excluído! 🗑️');
            document.getElementById('edit-modal').style.display = 'none';
            if (cardsSection) {
                cardsSection.innerHTML = '';
                createCards(cardsSection);
            }
        } else {
            alert('Erro ao excluir.');
        }
    }
}

// ❌ A função setupEventListeners() foi removida – ela não pertence a este módulo.
// Os listeners do carrinho e fechamento dos outros modais ficam no home_page.js.