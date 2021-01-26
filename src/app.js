const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to vegrecipes!');
});

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, '\nreason:', reason);
});

module.exports = app;
