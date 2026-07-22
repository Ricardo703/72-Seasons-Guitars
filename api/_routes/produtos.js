import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../_services/produtos_service.js';


const router = Router();

// GET /api/produtos  →  lista todos os produtos
router.get('/', async (req, res) => {
    const produtos = await getProducts();
    res.json(produtos);
});

// POST /api/produtos  →  cadastra novo produto
router.post('/', async (req, res) => {
    const resultado = await addProduct(req.body);
    res.status(201).json(resultado);
});

// PUT /api/produtos/:id  →  atualiza um produto
router.put('/:id', async (req, res) => {
    const resultado = await updateProduct(req.params.id, req.body);
    res.json(resultado);
});

// DELETE /api/produtos/:id  →  deleta um produto
router.delete('/:id', async (req, res) => {
    const resultado = await deleteProduct(req.params.id);
    res.json(resultado);
});

export default router;
