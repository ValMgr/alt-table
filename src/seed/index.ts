import { Meal, MealType } from '@models/meal';
import axios from 'axios';

const mealSeed: Omit<Meal, 'id'>[] = [
  {
    name: 'Planche de charcuterie et fromage',
    type: MealType.Appetizer,
    price: 8.5,
    description: 'Planche de charcuterie et fromage à partager',
  },
  {
    name: 'Saucisson landais',
    type: MealType.Appetizer,
    price: 5.5,
    description: 'Saucisson landais accompagné de cornichons et de pain de campagne grillé',
  },
  {
    name: 'Planche de tapas',
    type: MealType.Appetizer,
    price: 8.5,
    description: 'Planche de tapas à partager, jambon ibérique, chorizo, olives, tomates cerises, fromage de brebis',
  },
  {
    name: 'Tartare de saumon',
    type: MealType.Starter,
    price: 8.5,
    description: 'Tartare de saumon',
  },
  {
    name: 'Salade landaise au foie gras',
    type: MealType.Starter,
    price: 9.5,
    description: 'Salade iceberg, gésiers de canard, foie gras, lardons, tomates cerises, œufs de caille, maïs et pignons de pin',
  },
  {
    name: 'Salade de chèvre chaud',
    type: MealType.Starter,
    price: 6.5,
    description: 'Salade de chèvre chaud, tomates cerises, noix et miel',
  },
  {
    name: 'Garbure du jour',
    type: MealType.Starter,
    price: 5.5,
    description: 'Garbure de légumes et de viande',
  },
  {
    name: 'Axoa de porc',
    type: MealType.MainCourse,
    price: 12.5,
    description: 'Axoa de porc et pommes de terre',
  },
  {
    name: 'Poulet basquaise',
    type: MealType.MainCourse,
    price: 12.5,
    description: 'Poulet basquaise et riz basmati',
  },
  {
    name: 'Magret de canard',
    type: MealType.MainCourse,
    price: 14.5,
    description: 'Magret de canard et pommes de terre servies avec des pommes de terre à la sarladaise',
  },
  {
    name: 'Tourtière gasconne',
    type: MealType.Dessert,
    price: 5.5,
    description: "Tourtière gasconne aux pommes et aux pruneaux et à l'armagnac",
  },
  {
    name: 'Pastis landais',
    type: MealType.Dessert,
    price: 5.5,
    description: 'Pastis landais',
  },
  {
    name: 'Fondant au chocolat et sa crème anglaise',
    type: MealType.Dessert,
    price: 5.5,
    description: 'Fondant au chocolat et sa crème anglaise',
  },
  {
    name: 'Tarte aux pommes',
    type: MealType.Dessert,
    price: 5.5,
    description: 'Tarte aux pommes',
  },
  {
    name: 'Plateau de fromages',
    type: MealType.Dessert,
    price: 5.5,
    description: 'Plateau de fromages',
  },
];

export const populateMeals = () => {
  mealSeed.forEach(async (meal) => {
    const { data } = await axios.post('http://localhost:3000/api/meal', meal);

    if (Math.random() < 0.3) {
      return;
    }

    axios.post(`http://localhost:3000/api/stock/${data.id}`, {
      id: data.id,
      quantity: Math.floor(Math.random() * 10 + 1),
    });
  });
};
