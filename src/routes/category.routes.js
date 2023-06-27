const express = require('express');
const CategoryService = require('../services/category.service');
const validationHandler = require('../middlewares/validation.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema } = require('../schemas/category.dto');
const router = express.Router();
const service = new CategoryService();

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: Endpoints para administrar productos de la Geek Store
 *
 */
/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *   summary: Retorna la lista de categorias
 *   tags: [Categories]
 *   responses:
 *    200:
 *     description: Lista de categorias
 *    content:
 *     application/json:
 *    schema:
 *     type: array
 *     items:
 *     $ref: '#/components/schemas/Category'
 *    500:
 *     description: Error interno
 *
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}
);
/**
 * @swagger
 * api/v1/categories/{id}:
 *  get:
 *   summary: Retorna una categoria según su id
 *   tags: [Categories]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: Id de la categoria
 *   responses:
 *    200:
 *     description: Categoria
 *    content:
 *     application/json:
 *    schema:
 *      type: object
 *      $ref: '#/components/schemas/Category'
 *    404:
 *     description: Categoria no encontrada
 *    500:
 *     description: Error interno
 *
 *
 */
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

/**
 * @swagger
 *  components:
 *   schemas:
 *    Category:
 *     type: object
 *     properties:
 *      name:
 *       type: string
 *       description: Nombre de la categoría
 *       example: Figures
 *     required:
 *      - name
 *     example:
 *      name: Others
 */
/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *   summary: Crear una nueva categoria
 *   tags: [Categories]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Category'
 *   responses:
 *    201:
 *     description: categoria creada correctamente
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Category'
 *    400:
 *     description: Error en la petición
 *    500:
 *     description: Error interno
 *
 */
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
/**
 * @swagger
 * /api/v1/categories/{id}:
 *  get:
 *   summary: actualiza una categoria según su id
 *   tags: [Categories]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: Id dela categoria
 *   responses:
 *    200:
 *     description: ok
 *    content:
 *     application/json:
 *    schema:
 *     type: array
 *     items:
 *     $ref: '#/components/schemas/Category'
 *    500:
 *     description: Error interno
 *    404:
 *     description: Categoria no encontrada
 *
 */
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
/**
 * @swagger
 * /api/v1/categories/{id}:
 *  delete:
 *   summary: Elimina una categoria según su id
 *   tags: [Categories]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: Id dela categoria
 *   responses:
 *    204:
 *     description: Categoria eliminada correctamente
 *    404:
 *     description: Categoria no encontrada
 *    500:
 *     description: Error interno
 *
 */
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
