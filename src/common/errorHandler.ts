import { ErrorRequestHandler } from 'express';

const handler: ErrorRequestHandler = (err: Error, req, res, next): void => {
  console.error(err.name, err.message, err.stack);
  res.status(500).send();
  next();
};

export default handler;
