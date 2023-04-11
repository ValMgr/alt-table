import { v4 as uuid } from 'uuid';

import { meals } from '@db/meal';
import { Meal } from '@models/meal';

export const getMeals = async (): Promise<Meal[]> => Array.from(meals, ([id, meal]) => ({ id, ...meal }));

export const getMeal = async (id: string): Promise<Meal | undefined> => {
  const meal = meals.get(id);
  return meal ? { id, ...meal } : undefined;
};

export const addMeal = async (meal: Omit<Meal, 'id'>): Promise<string> => {
  const id = uuid();
  meals.set(id, { id, ...meal });
  return id;
};
