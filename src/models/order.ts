export type MealOrder = {
  mealId: string;
  comment: string;
};

export class Order {
  id: string;
  date: Date;
  meals: MealOrder[];
}
