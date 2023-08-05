'use strict';
const { GEEK_TABLE } = require('../models/geek.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(GEEK_TABLE, 'url', {
      type: Sequelize.STRING(2000),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(GEEK_TABLE, 'url', {
      type: Sequelize.STRING,
    });
  }
};
