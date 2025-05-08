const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userRoutes = require('../routes/userRoutes');
const User = require('../models/userModel');
const { errorHandler } = require('../middleware/errorMiddleware');

// Setup Express app
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler); // add this line!

process.env.JWT_SECRET = 'testsecret';

describe('User Controller', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register user with existing email', async () => {
    await User.create({ name: 'Test', email: 'test@example.com', password: '123456' });

    const res = await request(app).post('/api/users/register').send({
      name: 'Test 2',
      email: 'test@example.com',
      password: 'abcdef',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/User already exists/i);
  });

  it('should login a user with correct credentials', async () => {
    const user = new User({ name: 'Login User', email: 'login@example.com', password: '123456' });
    await user.save();

    const res = await request(app).post('/api/users/login').send({
      email: 'login@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login user with wrong credentials', async () => {
    await User.create({ name: 'Wrong Login', email: 'wrong@example.com', password: '123456' });

    const res = await request(app).post('/api/users/login').send({
      email: 'wrong@example.com',
      password: 'wrongpass',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid credentials/i);
  });
});
