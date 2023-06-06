const express = require('express');
const GeekService = require('../services/geek.service');
const validationHandler = require('../middlewares/validation.handler');
const { createGeekSchema, updateGeekSchema, getGeekSchema, deleteGeekSchema } = require('../schemas/geek.dto');
const router = express.Router();
const service = new GeekService();

router.get('/', async (req, res, next) => {
  try {
    const geeks = await service.find();
    res.status(200).json(geeks);
  } catch (error) {
    next(error);
  }
}
);

router.get('/:id',
validationHandler(getGeekSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const geek = await service.findOne(id);
    res.status(200).json(geek);
  } catch (error) {
    next(error);
  }
}
);

router.get('/category/:categoryId',
async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const geeks = await service.findByCategory(categoryId);
    res.status(200).json(geeks);
  } catch (error) {
    next(error);
  }
}
);


router.post('/',
 validationHandler(createGeekSchema,'body'),
 async (req, res, next) => {
  try {
    const body = req.body;
    const created = await service.create(body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}
);

router.patch('/:id',
validationHandler(getGeekSchema, 'params'),
validationHandler(updateGeekSchema,'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await service.update(id, body);
    res.status(201).json(updated);
  } catch (error) {
    next(error);
  }
}
);

router.delete('/:id',
validationHandler(deleteGeekSchema, 'params'),
async (req, res, next) => {

  try {
    const { id } = req.params;
    const deleted = await service.delete(id);
    res.status(204).json(deleted);
  } catch (error) {
    next(error);
  }
}
);

module.exports = router;
