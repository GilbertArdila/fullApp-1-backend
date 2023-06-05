const Express = require('express');
const GeekRoutes = require('./geek.routes');
const CategoryRoutes = require('./category.routes');

const routerApi = (app) => {
  const router = Express.Router();
  app.use('/api/v1', router);
  router.use('/geeks', GeekRoutes);
  router.use('/categories', CategoryRoutes);
}

module.exports = routerApi;
