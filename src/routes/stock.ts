import { Router, Express } from 'express';

import { addToStockController, getMealStockController, removeFromStockController } from '@controllers/stock';
import { addMealStock, checkBody, checkId, getMealStock, removeMealStock } from '@middlewares/stock';

export const useStockroutes = (app: Express) => {
  const router = Router();

  router.get('/', getMealStock, getMealStockController);

  router.post('/:id', checkId, checkBody, addMealStock, addToStockController);

  router.delete('/:id', checkId, checkBody, removeMealStock, removeFromStockController);

  app.use('/api/stock', router);
};
