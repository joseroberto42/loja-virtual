"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.ts
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user")); // Ajuste o caminho conforme sua estrutura
const router = (0, express_1.Router)();
// Registro de novo usuário
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verifica se o usuário já existe
        const existingUser = await user_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Hash da senha
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Cria um novo usuário
        const newUser = await user_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
        // Gera um token JWT
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.default = router;
