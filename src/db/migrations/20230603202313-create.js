'use strict';
const { GEEK_TABLE, GeekSchema } = require('../models/geek.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(GEEK_TABLE, GeekSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(GEEK_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
