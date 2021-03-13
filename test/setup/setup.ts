import { dbClose, dbInit } from './db';

beforeAll(dbInit);
afterAll(dbClose);
