import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';  // Supondo que você tenha a conexão Sequelize configurada aqui

// Definição das propriedades do produto
interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definição dos campos opcionais na criação do produto
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

// Definindo o modelo do Produto
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializando o modelo Product com Sequelize
Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',  // Nome da tabela no banco de dados
    timestamps: true,       // Ativa os timestamps para createdAt e updatedAt
  }
);

export default Product;


