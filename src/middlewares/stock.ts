import { Request, Response, NextFunction } from 'express';

import { getStock, addToStock, removeFromStock, createStock } from '@repository/stock';

export const checkId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { id: bodyId } = req.body;

  if (id !== bodyId) {
    return res.status(400).send({ message: 'Id in params and body do not match' });
  }

  return next();
};

export const checkBody = async (req: Request, res: Response, next: NextFunction) => {
  const { id, quantity } = req.body;

  if (!id || !quantity) {
    return res.status(400).send({ message: 'Missing id or quantity' });
  }

  return next();
};

export const getMealStock = async (req: Request, res: Response, next?: NextFunction) => {
  req.stock = await getStock();

  if (next) return next();

  return null;
};

export const addMealStock = async (req: Request, res: Response, next: NextFunction) => {
  const { id, quantity } = req.body;

  const meal = await addToStock(id, quantity);

  if (!meal) {
    return res.status(400).send({ message: 'Meal not found' });
  }

  req.stock = meal;
  return next();
};

export const removeMealStock = async (req: Request, res: Response, next?: NextFunction) => {
  const { id, quantity } = req.body;

  const { id: mealId } = await removeFromStock(id, quantity);

  if (!mealId) {
    return res.status(400).send({ message: 'Meal not found' });
  }

  if (next) return next();

  return null;
};

export const createMealStock = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req;

  createStock(id);

  return next();
};
