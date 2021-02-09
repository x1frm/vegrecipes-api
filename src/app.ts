import express from 'express';
import 'express-async-errors';
import { NODE_ENV } from './common/config';
import errorHandler from './common/errorHandler';
import router from './router';

const app = express();

app.use(express.json());

if (NODE_ENV === 'development') {
  import('./doc/swaggerUi.router')
    .then(module => app.use('/doc', module.default))
    .catch(console.error);
}

app.get('/', (req, res) => {
  res.send('Welcome to vegrecipes!');
});

app.use(router);

app.use(errorHandler);

process.on('uncaughtException', (err: Error, origin: any) => {
  console.log(`Caught exception: ${err}\n Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, '\nreason:', reason);
});

export default app;
