// src/routes/auth.ts
import { Router } from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user'; // Ajuste o caminho conforme sua estrutura

const router = Router();

// Registro de novo usuário
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Gera um token JWT
    const token = jwt.sign({ userId: newUser.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;


