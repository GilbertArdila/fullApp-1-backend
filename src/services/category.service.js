const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class CategoryService {
  constructor() {
    this.model = models.Category;
  }

  async create(data) {
    const category = await this.model.create(data);
    return category;
  }

  async find() {
    const categories = await this.model.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await this.model.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const updated = await category.update(changes);
    return updated;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
