import request from 'supertest';
import app from '../app';

describe('/doc', () => {
  it('responses with swagger html', async () => {
    process.env.NODE_ENV = 'development';
    const res = await request(app).get('/doc/');
    expect(res.status).toBe(200);
    expect(res.headers?.['content-type']).toContain('text/html');
  });
});
