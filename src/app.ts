import express from 'express';
import 'express-async-errors';
import pino from 'pino';
import helmet from 'helmet';
import { NODE_ENV } from './common/config';
import errorHandler from './common/errorHandler';
import router from './api.router';
import logger, { debug, loggerMiddleware } from './common/logger';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(loggerMiddleware);

if (/^(development|test)$/.test(NODE_ENV as string)) {
  import('./doc/swaggerUi.router').then(module => app.use('/doc', module.default)).catch(debug);

  app.use('/coverage', express.static('coverage/lcov-report'));
}

app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send('Welcome to vegrecipes!');
});

app.use('/api', router);

app.use(errorHandler);

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'Uncaught Exception');
    process.exit(1);
  })
);

process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'Unhandled Rejection');
    process.exit(1);
  })
);

export default app;
