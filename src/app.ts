import express from 'express';
import 'express-async-errors';
import { NODE_ENV } from './common/config';
import errorHandler from './common/errorHandler';
import router from './api.router';

const app = express();

app.use(express.json());

if (/^(development|test)$/.test(NODE_ENV as string)) {
  import('./doc/swaggerUi.router')
    .then(module => app.use('/doc', module.default))
    .catch(console.error);

  app.use('/coverage', express.static('coverage/lcov-report'));
}

app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send('Welcome to vegrecipes!');
});

app.use('/api', router);

app.use(errorHandler);

process.on('uncaughtException', err => {
  console.log(`Uncaught exception: ${err}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, '\nreason:', reason);
});

export default app;
