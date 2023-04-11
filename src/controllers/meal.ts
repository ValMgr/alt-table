import { Request, Response } from 'express';

export const getMealsController = async (req: Request, res: Response) => {
  res.status(200).send(req.meals);
};

export const getMealController = async (req: Request, res: Response) => {
  res.status(200).send({ meal: req.meal });
};

export const createMealController = async (req: Request, res: Response) => {
  res.status(201).send({ id: req.id });
};

export const getMenuController = async (req: Request, res: Response) => {
  res.status(200).send(req.menu);
};
