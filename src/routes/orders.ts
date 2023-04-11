import { Router, Express } from 'express';

import {
  getOrdersController,
  getOrderController,
  createOrderController,
  deleteOrderController,
} from '@controllers/order';
import { checkId, checkBody, getOneOrder, getOrdersList, createOrder, deleteExistingOrder } from '@middlewares/orders';

export const useOrderRoutes = (app: Express) => {
  const router = Router();

  router.get('/', getOrdersList, getOrdersController);

  router.get('/:id', checkId, getOneOrder, getOrderController);

  router.post('/', checkBody, createOrder, createOrderController);

  router.delete('/:id', checkId, deleteExistingOrder, deleteOrderController);

  app.use('/api/orders', router);
};
