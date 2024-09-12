import { Sequelize } from 'sequelize';

// Conexão com o banco de dados MySQL
const sequelize = new Sequelize('loja', 'root', 'nova_senha', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

