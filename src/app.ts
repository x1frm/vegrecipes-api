import express from 'express';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../doc/swagger.json');

const app = express();

app.use(express.json());
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to vegrecipes!');
});

process.on('uncaughtException', (err: Error, origin: any) => {
  console.log(`Caught exception: ${err}\n Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, '\nreason:', reason);
});

export default app;