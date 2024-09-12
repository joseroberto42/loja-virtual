import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';  // Supondo que você tenha a conexão Sequelize configurada aqui

// Definição das propriedades do usuário
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definição dos campos opcionais na criação do usuário
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definindo o modelo do Usuário
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializando o modelo User com Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',  // Nome da tabela no banco de dados
    timestamps: true,    // Ativa os timestamps para createdAt e updatedAt
  }
);

export default User;
