/* eslint-disable */
namespace Express {
  interface Request {
    meals: Meal[];
    meal: Meal;
    id: string;
    stock: { id: string; quantity: number }[] | { id: string; quantity: number };
    menu: Meal[];
    order: Order;
    orders: Order[];
  }
}
/* eslint-enable */
