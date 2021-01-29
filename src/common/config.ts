import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING as string;
export const { JWT_SECRET_KEY } = process.env;
