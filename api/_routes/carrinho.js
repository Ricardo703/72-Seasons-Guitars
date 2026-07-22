import { Router } from 'express';
import {
    obterCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    obterPrecoTotal,
    obterTotalItensCarrinho
} from '../_services/carrinho_service.js';


const router = Router();

// GET /api/carrinho  →  retorna itens do carrinho
router.get('/', (req, res) => {
    res.json(obterCarrinho());
});

// POST /api/carrinho  →  adiciona produto ao carrinho
router.post('/', (req, res) => {
    adicionarAoCarrinho(req.body);
    res.status(201).json({ mensagem: 'Produto adicionado ao carrinho' });
});

// DELETE /api/carrinho/:index  →  remove item pelo índice
router.delete('/:index', (req, res) => {
    removerDoCarrinho(Number(req.params.index));
    res.json({ mensagem: 'Item removido do carrinho' });
});

// DELETE /api/carrinho  →  limpa o carrinho todo
router.delete('/', (req, res) => {
    limparCarrinho();
    res.json({ mensagem: 'Carrinho limpo' });
});

export default router;
