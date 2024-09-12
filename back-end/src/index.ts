import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/database';  // Ajuste o caminho conforme necessário
import productRoutes from './routes/products';
import userRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Conectar ao banco de dados e iniciar o servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sincronizar os modelos com o banco de dados
    await sequelize.sync({ alter: true });  // Use { force: true } para recriar as tabelas

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
