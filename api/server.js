import 'dotenv/config';
import express from 'express';
import cors from 'cors';


import produtosRouter from './_routes/produtos.js';
import carrinhoRouter from './_routes/carrinho.js';
import categoriasRouter from './_routes/categoria.js';


const app = express();

app.use(cors());
app.use(express.json());

// 👇 Registre as rotas com seus prefixos de URL
app.use('/api/produtos', produtosRouter);
app.use('/api/carrinho', carrinhoRouter);
app.use('/api/categorias', categoriasRouter);

export default app;

// Só liga o servidor local se NÃO estiver no ambiente do Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORTA = 3001;
    app.listen(PORTA, () => {
        console.log(`Servidor rodando em http://localhost:${PORTA}`);
    });
}
