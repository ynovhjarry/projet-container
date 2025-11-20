const request = require('supertest');
const app = require('../index');

describe('API health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/healthz');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('ok');
  });
});
