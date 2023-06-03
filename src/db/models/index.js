const {Geek,GeekSchema} = require('./geek.model');
const {Category,CategorySchema} = require('./category.model');

const setupModels = (sequelize) => {
  Geek.init(GeekSchema,Geek.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));

  Geek.associate(sequelize.models);

}

module.exports = setupModels;
