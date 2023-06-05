const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class GeekService {
  constructor() {

  }

  async create(data) {
    const geek = await models.Geek.create(data);
    return geek;
  }

  async update(id, changes) {
    const geek = await models.Geek.findByPk(id);
    if (!geek) {
      throw boom.notFound('Geek not found');
    }
    const updatedGeek = await geek.update(changes);
    return updatedGeek;
  }

  async delete(id) {
    const geek = await models.Geek.findByPk(id);
    if (!geek) {
      throw boom.notFound('Geek not found');
    }
    await geek.destroy();
    return id ;
  }

  async find() {
    const geeks = await models.Geek.findAll({
      include: ['category'],
    });
    return geeks;
  }

  async findOne(id) {
    const geek = await models.Geek.findByPk(id);
    if (!geek) {
      throw boom.notFound('Geek not found');
    }
    return geek;
  }
}
module.exports = GeekService;
