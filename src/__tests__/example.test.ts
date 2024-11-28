// src/__tests__/example.test.ts
import request from 'supertest';
import app from '../index';

describe('GET /', () => {
  it('should return a success message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, TypeScript with Travis CI!');
  });

  it('should return a 500 error for internal server errors', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
  });
});