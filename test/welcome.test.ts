import request from 'supertest';
import app from '../src/app.ts';

describe('Test the root path', () => {
  test('It should response the GET method', () => request(app).get('/').expect(200));
});
