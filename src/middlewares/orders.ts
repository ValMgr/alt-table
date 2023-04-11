import { Request, Response, NextFunction } from 'express';

import { getOrder, getOrders, addOrder, deleteOrder } from '@repository/order';
import { MealOrder } from '@models/order';
import { getMealStock, removeMealStock } from '@middlewares/stock';

export const checkId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { id: orderId } = req.body;

  if (!id || !orderId) {
    return res.status(400).send({ message: 'Missing id' });
  }

  if (id !== orderId) {
    return res.status(400).send({ message: 'Id does not match' });
  }

  return next();
};

export const checkBody = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).send({ message: 'Missing body' });
  }

  const { order } = body;

  if (!order || !order.length) {
    return res.status(400).send({ message: 'Missing order' });
  }

  if (!order.every((item: any) => item.meal)) {
    return res.status(400).send({ message: 'Missing meal id' });
  }

  return next();
};

export const getOrdersList = async (req: Request, res: Response, next: NextFunction) => {
  req.orders = await getOrders();

  return next();
};

export const getOneOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const order = await getOrder(id);

  if (!order) {
    return res.status(404).send({ message: 'Order not found' });
  }

  req.order = order;

  return next();
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  await getMealStock(req, res);
  const { order } = req.body;
  const { stock } = req as { stock: { id: string; quantity: number }[] };

  const mealsOrder: MealOrder[] = order.map((item: any) => ({
    mealId: item.meal,
    comment: item.comment,
  }));

  const mealsQuantity = mealsOrder.reduce((acc: any, item: any) => {
    if (!acc[item.mealId]) {
      acc[item.mealId] = 1;
    } else {
      acc[item.mealId] += 1;
    }

    return acc;
  }, {});

  const mealsNotAvailable = Object.keys(mealsQuantity).filter((mealId: string) => {
    const mealStock = stock.find((item: any) => item.id === mealId);

    if (!mealStock) {
      return true;
    }

    return mealStock.quantity < mealsQuantity[mealId];
  });

  if (mealsNotAvailable.length) {
    const meals = mealsNotAvailable.map((mealId: string) => {
      const mealStock = stock.find((item: any) => item.id === mealId);

      return {
        id: mealId,
        quantity: mealStock ? mealStock.quantity : 0,
      };
    });

    return res.status(400).send({ message: 'Some meals are not available', meals });
  }

  const id = await addOrder({ meals: mealsOrder });

  mealsOrder.forEach(async (item: any) => {
    req.body = { id: item.mealId, quantity: 1 };
    await removeMealStock(req, res);
  });

  req.order = await getOrder(id);

  return next();
};

export const deleteExistingOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  await deleteOrder(id);

  return next();
};
