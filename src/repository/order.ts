import { v4 as uuid } from 'uuid';

import { orders } from '@db/order';
import { Order } from '@models/order';

export const getOrders = async (): Promise<Order[]> => Array.from(orders, ([id, order]) => ({ id, ...order }));

export const getOrder = async (id: string): Promise<Order | undefined> => {
  const order = orders.get(id);
  return order ? { id, ...order } : undefined;
};

export const addOrder = async (order: Omit<Order, 'id'|'date'>): Promise<string> => {
  const id = uuid();
  const date = new Date();

  orders.set(id, { id, date, ...order });
  return id;
};

export const updateOrder = async (id: string, order: Omit<Order, 'id'>): Promise<void> => {
  orders.set(id, { id, ...order });
};

export const deleteOrder = async (id: string): Promise<void> => {
  orders.delete(id);
};
