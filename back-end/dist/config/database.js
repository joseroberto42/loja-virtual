"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Conexão com o banco de dados MySQL
const sequelize = new sequelize_1.Sequelize('loja', 'root', 'nova_senha', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
