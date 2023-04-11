import { Request, Response } from 'express';

export const getMealStockController = async (req: Request, res: Response) => {
  res.status(200).send(req.stock);
};

export const addToStockController = async (req: Request, res: Response) => {
  res.status(201).send({ id: req.stock });
};

export const removeFromStockController = async (req: Request, res: Response) => {
  res.status(200).send({ id: req.stock });
};
