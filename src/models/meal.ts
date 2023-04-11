/* eslint-disable no-unused-vars */

export enum MealType {
  Appetizer = 'Apéritif',
  Starter = 'Entrée',
  MainCourse = 'Plat Principal',
  Dessert = 'Dessert',
}

export class Meal {
  id: string;
  name: string;
  description: string;
  type: MealType;
  price: number = 0;
}
