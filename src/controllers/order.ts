import { Request, Response } from 'express';

export const getOrdersController = async (req: Request, res: Response) => {
  res.status(200).send(req.orders);
};

export const getOrderController = async (req: Request, res: Response) => {
  res.status(200).send({ order: req.order });
};

export const createOrderController = async (req: Request, res: Response) => {
  res.status(201).send({ id: req.id });
};

export const updateOrderController = async (req: Request, res: Response) => {
  res.status(204).send();
};

export const deleteOrderController = async (req: Request, res: Response) => {
  res.status(204).send();
};
