import { Request, Response, NextFunction } from 'express';

import { getMeals, addMeal, getMeal } from '@repository/meal';
import { MealType } from '@models/meal';
import { createMealStock, getMealStock } from '@middlewares/stock';

export const checkBody = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).send({ message: 'Body is missing' });
  }

  const { name, description, price, type } = body;

  if (!name || !description || !price || !type) {
    return res.status(400).send({
      message: `Body incomplete: ${!name ? 'name,' : ''} ${!description ? 'description,' : ''} ${
        !price ? 'price,' : ''
      } ${!type ? 'type' : ''}`,
    });
  }

  if (price < 0) {
    return res.status(400).send({ message: 'Price cannot be negative' });
  }

  if (!Object.values(MealType).includes(type)) {
    return res.status(400).send({ message: 'Type is invalid' });
  }

  return next();
};

export const getMealList = async (req: Request, res: Response, next: NextFunction) => {
  const meals = await getMeals();

  if (!meals) {
    return res.status(404).send({ message: 'No meals found' });
  }

  req.meals = meals;

  return next();
};

export const getOneMeal = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const meal = await getMeal(id);

  if (!meal) {
    return res.status(404).send({ message: 'Meal not found' });
  }

  req.meal = meal;
  return next();
};

export const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  const meal = req.body;
  const meals = await getMeals();

  if (meals.some((m) => m.name === meal.name)) {
    return res.status(400).send({ message: 'Meal already exists' });
  }

  const id = await addMeal(meal);

  if (!id) {
    return res.status(500).send({ message: 'Meal could not be created' });
  }

  req.id = id;
  return createMealStock(req, res, next);
};

export const getAvailableMeal = async (req: Request, res: Response, next: NextFunction) => {
  const meals = await getMeals();
  await getMealStock(req, res);
  const { stock } = req as { stock: { id: string; quantity: number }[] };

  req.menu = meals.filter((meal) => stock.find((s) => s.id === meal.id && s.quantity > 0));

  return next();
};
