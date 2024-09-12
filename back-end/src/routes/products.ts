import { Router } from 'express';
import Product from '../model/product';

const router = Router();

// Criar um novo produto
router.post('/', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  
  try {
    const product = await Product.create({ name, price, description, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Obter um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Atualizar um produto por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

// Excluir um produto por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido' });
    }
  }
});

export default router;
