import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { useMealRoutes } from '@routes/meal';
import { useStockroutes } from '@routes/stock';
import { useOrderRoutes } from '@routes/orders';

import { populateMeals } from './seed';

const app = express();
const startTimestamp = new Date();

app.use(cors());
app.use(bodyParser.json());

useMealRoutes(app);
useStockroutes(app);
useOrderRoutes(app);

// seed data for testing
populateMeals();

app.get('/', (req: Request, res: Response) => {
  res.send({
    version: '1.0.0',
    message: 'Alt Tables - V. Magry',
    uptime: `${startTimestamp.toUTCString()}`,
  });
});

app.get('*', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Route not found' });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running ! 🚀 http://localhost:3000');
});
