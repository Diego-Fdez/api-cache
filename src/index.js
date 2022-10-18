import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import apicache from 'apicache';
import router from './v1/routes/workoutRoutes.js';
import { swaggerDocs } from './v1/swagger.js';

const app = express();
const cache = apicache.middleware;
dotenv.config();

const Port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
//app.use(cache('2 minutes'));
app.use('/api/v1', router);

app.listen(Port, () => {
  console.log(`Example app listening at http://localhost:${Port}`);
  swaggerDocs(app, Port);
});
