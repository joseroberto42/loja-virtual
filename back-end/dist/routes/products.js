"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../model/product"));
const router = (0, express_1.Router)();
// Criar um novo produto
router.post('/', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        const product = await product_1.default.create({ name, price, description, imageUrl });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});
// Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await product_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});
// Obter um produto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await product_1.default.findByPk(req.params.id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});
// Atualizar um produto por ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await product_1.default.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedProduct = await product_1.default.findByPk(req.params.id);
            res.json(updatedProduct);
        }
        else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});
// Excluir um produto por ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await product_1.default.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Produto excluído com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});
exports.default = router;
