"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database")); // Ajuste o caminho conforme necessário
const products_1 = __importDefault(require("./routes/products"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Rotas
app.use('/api/products', products_1.default);
app.use('/api/users', auth_1.default);
// Conectar ao banco de dados e iniciar o servidor
const startServer = async () => {
    try {
        // Conectar ao banco de dados
        await database_1.default.authenticate();
        console.log('Connection to the database has been established successfully.');
        // Sincronizar os modelos com o banco de dados
        await database_1.default.sync({ alter: true }); // Use { force: true } para recriar as tabelas
        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
startServer();
