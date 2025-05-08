const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // Ensure app is exported from server.js
const User = require('../models/userModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('User Routes', () => {
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  test('Register User', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toBe(userData.email);
  });

  test('Login User', async () => {
    await request(app).post('/api/users/register').send(userData);

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: userData.email,
        password: userData.password,
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(res.body.email).toBe(userData.email);
  });

  test('Get Profile (Protected)', async () => {
    const registerRes = await request(app).post('/api/users/register').send(userData);
    const token = registerRes.body.token;

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('email', userData.email);
  });

  test('Update Profile (Protected)', async () => {
    const registerRes = await request(app).post('/api/users/register').send(userData);
    const token = registerRes.body.token;

    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name' })
      .expect(200);

    expect(res.body.name).toBe('Updated Name');
  });

  test('Delete Profile (Protected)', async () => {
    const registerRes = await request(app).post('/api/users/register').send(userData);
    const token = registerRes.body.token;

    const res = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.message).toBe('User deleted');
  });
});
