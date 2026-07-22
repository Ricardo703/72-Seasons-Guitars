import { criarCard, criarCardAdicionar } from '../view/components/card_view.js';

async function getProducts() {
   const response = await fetch('/api/produtos');
   return await response.json();
}

export async function createCards(cards_sec) {
   try {
      const produtos = await getProducts();

      // Limpa a seção antes de popular
      cards_sec.innerHTML = '';

      // Cria cards dos produtos usando a View
      for (const produto of produtos) {
         const card = criarCard(produto);
         cards_sec.appendChild(card);
      }

      // Adiciona o card "Adicionar Produto" no final
      const cardAdicionar = criarCardAdicionar();
      cards_sec.appendChild(cardAdicionar);
   } catch (error) {
      console.error('Erro ao criar os cards:', error);
   }
}