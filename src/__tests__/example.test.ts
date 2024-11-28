// src/__tests__/example.test.ts

import request from 'supertest';
import app from '../index';

describe('GET /', () => {
  it('should return a 200 response', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, TypeScript with Travis CI!');
  });
});

describe('GET /non-existent-route', () => {
  it('should return a 404 response', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
  });
});

describe('Error handling', () => {
  it('should return a 500 response when an error occurs', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
  });
});