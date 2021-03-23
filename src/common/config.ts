import dotenv from 'dotenv';
import path from 'path';
import { Level } from 'pino';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT, NODE_ENV, JWT_SECRET_KEY, LOG_DIR } = process.env;
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING as string;
export const LOG_LEVEL = process.env.LOG_LEVEL as Level | undefined;
