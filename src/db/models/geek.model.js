const {Model,Sequelize,DataTypes} = require('sequelize');

const GEEK_TABLE = 'geeks';

const GeekSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
  },

};

class Geek extends Model {
  static associate(models) {
    this.belongsTo(models.Category,{
      foreignKey:'categoryId',
      as:'category'
    })
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: GEEK_TABLE,
      modelName: 'Geek',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      underscored: true,
    }
  }
}
module.exports = {GeekSchema,Geek,GEEK_TABLE};
