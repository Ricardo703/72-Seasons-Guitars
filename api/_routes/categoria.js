import { Router } from 'express';
import { getCategoria } from '../_services/categoria_service.js';


const router = Router();

// GET /api/categorias  →  lista todas as categorias
router.get('/', async (req, res) => {
    const categorias = await getCategoria();
    res.json(categorias);
});

export default router;
