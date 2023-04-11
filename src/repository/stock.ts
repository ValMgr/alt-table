import { stock } from '@db/stock';

export const getStock = async (): Promise<{ id: string; quantity: number }[]> => {
  return Array.from(stock, ([id, quantity]) => ({ id, quantity }));
};

export const addToStock = async (
  id: string,
  quantity: number,
): Promise<{ id: string; quantity: number } | undefined> => {
  if (!stock.has(id) && quantity !== 0) {
    return undefined;
  }

  if (!stock.has(id)) {
    stock.set(id, quantity);
    return { id, quantity };
  }

  const currentQuantity = stock.get(id);
  stock.set(id, currentQuantity + quantity);

  return { id, quantity: currentQuantity + quantity };
};

export const createStock = async (id: string): Promise<{ id: string; quantity: number }> => {
  stock.set(id, 0);

  return { id, quantity: 0 };
};

export const removeFromStock = async (
  id: string,
  quantity: number,
): Promise<{ id: string; quantity: number } | undefined> => {
  if (!stock.has(id)) {
    return undefined;
  }

  const currentQuantity = stock.get(id);
  stock.set(id, currentQuantity - quantity);

  return { id, quantity: currentQuantity - quantity };
};
