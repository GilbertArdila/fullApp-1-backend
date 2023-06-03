const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(100);
const url = Joi.string().uri();
const price = Joi.number().min(0);
const quantity = Joi.number().min(1);
const category = Joi.string();

const createGeekSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  url: url.required(),
  price: price.required(),
  quantity: quantity.required(),
  category: category.required(),
});

const updateGeekSchema = Joi.object({
  name,
  description,
  url,
  price,
  quantity,
  category,
});

const getGeekSchema = Joi.object({
  id: id.required(),
});

const deleteGeekSchema = Joi.object({
  id: id.required(),
});

module.exports = { createGeekSchema, updateGeekSchema, getGeekSchema, deleteGeekSchema };
