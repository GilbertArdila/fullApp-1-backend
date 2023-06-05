const express = require('express');
const CategoryService = require('../services/category.service');
const validationHandler = require('../middlewares/validation.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema } = require('../schemas/category.dto');
const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}
);

router.get('/:id',
validationHandler(getCategorySchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
}
);

router.post('/',
validationHandler(createCategorySchema,'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}
);

router.patch('/:id',
validationHandler(getCategorySchema, 'params'),
validationHandler(updateCategorySchema,'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedCategory = await service.update(id, body);
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
}
);

router.delete('/:id',
validationHandler(deleteCategorySchema,'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await service.delete(id);
    res.json(deletedCategory);
  } catch (error) {
    next(error);
  }
}
);

module.exports = router;
