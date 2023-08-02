const express = require('express');
const GeekService = require('../services/geek.service');
const validationHandler = require('../middlewares/validation.handler');
const { createGeekSchema, updateGeekSchema, getGeekSchema, deleteGeekSchema } = require('../schemas/geek.dto');
const router = express.Router();
const service = new GeekService();

/**
 * @swagger
 * tags:
 *  name: Geeks
 *  description: Endpoints para administrar productos de la Geek Store
 *
 */
/**
 * @swagger
 * /api/v1/geeks:
 *  get:
 *   summary: Retorna la lista de geeks
 *   tags: [Geeks]
 *   responses:
 *    200:
 *     description: Lista de geeks
 *    content:
 *     application/json:
 *    schema:
 *     type: array
 *     items:
 *     $ref: '#/components/schemas/Geek'
 *    500:
 *     description: Error interno
 *
 */
router.get('/', async (req, res, next) => {
  try {
    const geeks = await service.find();
    res.status(200).json(geeks);
  } catch (error) {
    next(error);
  }
}
);
/**
 * @swagger
 * api/v1/geeks/{id}:
 *  get:
 *   summary: Retorna un geek según su id
 *   tags: [Geeks]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Id del geek
 *   responses:
 *    200:
 *     description: Geek
 *    content:
 *     application/json:
 *    schema:
 *      type: object
 *      $ref: '#/components/schemas/Geek'
 *    404:
 *     description: Geek no encontrado
 *    500:
 *     description: Error interno
 *
 *
 */
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
/**
 * @swagger
 * /api/v1/geeks/category/{categoryId}:
 *  get:
 *   summary: Retorna una lista de geeks según su categoría
 *   tags: [Geeks]
 *   parameters:
 *    - in: path
 *      name: categoryId
 *      schema:
 *       type: integer
 *      required: true
 *      description: Id de la categoría
 *   responses:
 *    200:
 *     description: Lista de geeks
 *    content:
 *     application/json:
 *    schema:
 *     type: array
 *     items:
 *     $ref: '#/components/schemas/Geek'
 *    500:
 *     description: Error interno
 *
 */
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
/**
 * @swagger
 *  components:
 *   schemas:
 *    Geek:
 *     type: object
 *     properties:
 *      name:
 *       type: string
 *       description: Nombre del geek
 *       example: figura de acción
 *      price:
 *       type: number
 *       description: Precio del geek
 *       example: 10.13
 *      url:
 *       type: string
 *       description: Url de la imagen del geek
 *       example: http://laimagen.com
 *      categoryId:
 *       type: number
 *       description: Id de la categoría del geek
 *       example: 1
 *      quantity:
 *       type: number
 *       description: Cantidad de geeks
 *       example: 10
 *      description:
 *       type: string
 *       description: Descripción del geek
 *       example: figura de acción de star wars
 *     required:
 *      - name
 *      - price
 *      - url
 *      - categoryId
 *      - quantity
 *      - description
 *     example:
 *      name: lego set
 *      price: 10.13
 *      url: http://laimagen.com
 *      categoryId: 1
 *      quantity: 10
 *      description: Set de lego de star wars
 */
/**
 * @swagger
 * /api/v1/geeks:
 *  post:
 *   summary: Crear un nuevo geek
 *   tags: [Geeks]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Geek'
 *   responses:
 *    201:
 *     description: Geek creado correctamente
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Geek'
 *    400:
 *     description: Error en la petición
 *    500:
 *     description: Error interno
 *
 */
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
/**
 * @swagger
 * /api/v1/geeks/{id}:
 *  get:
 *   summary: actualiza un producto según su id
 *   tags: [Geeks]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Id del producto
 *   responses:
 *    200:
 *     description: ok
 *    content:
 *     application/json:
 *    schema:
 *     type: array
 *     items:
 *     $ref: '#/components/schemas/Geek'
 *    500:
 *     description: Error interno
 *    404:
 *     description: Geek no encontrado
 *
 */
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
/**
 * @swagger
 * /api/v1/geeks/{id}:
 *  delete:
 *   summary: Elimina un geek según su id
 *   tags: [Geeks]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: Id del geek
 *   responses:
 *    204:
 *     description: Geek eliminado correctamente
 *    404:
 *     description: Geek no encontrado
 *    500:
 *     description: Error interno
 *
 */
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
