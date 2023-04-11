import { Router, Express } from 'express';

import { checkBody, getMealList, createMeal, getOneMeal, getAvailableMeal } from '@middlewares/meal';
import { getMealController, getMealsController, createMealController, getMenuController } from '@controllers/meal';

export const useMealRoutes = (app: Express) => {
  const router = Router();

  router.get('/', getMealList, getMealsController);

  router.post('/', checkBody, createMeal, createMealController);

  router.get('/menu', getMealList, getAvailableMeal, getMenuController);

  router.get('/:id', getOneMeal, getMealController);

  app.use('/api/meal', router);
};
