const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class GeekService {
  constructor() {
    this.model = models.Geek;
  }

  async create(data) {
    const geek = await this.model.create(data);
    return geek;
  }

  async update(id, changes) {
    const geek = await this.model.findByPk(id);
    if (!geek) {
      throw boom.notFound('Geek not found');
    }
    const updatedGeek = await geek.update(changes);
    return updatedGeek;
  }

  async delete(id) {
    const geek = await this.model.findByPk(id);
    if (!geek) {
      throw boom.notFound('Geek not found');
    }
    await geek.destroy();
    return { id };
  }

  async findAll() {
    const geeks = await this.model.findAll();
    return geeks;
  }

  async findOne(id) {
    const geek = await this.model.findByPk(id);
    if (!geek) {
      throw boom.notFound('Geek not found');
    }
    return geek;
  }
}
module.exports = GeekService;
