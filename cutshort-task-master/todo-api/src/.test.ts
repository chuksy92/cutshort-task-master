import app from './index';
import { describe, test, expect, afterAll, beforeEach, afterEach } from '@jest/globals';
import { createRequest, createResponse } from 'node-mocks-http';
import mongoose from 'mongoose';



describe('User authentication endpoint', () => {

  beforeEach( async() => { 
    await mongoose.connect('mongodb://localhost:27017/todo')
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });


  test('should return a new user object', async () => {

    // Create a mock request with the necessary fields
    const request = createRequest({
      method: 'POST',
      url: '/api/auth/register',
      body: {
        name: 'John Doe',
        email: 'doe@example.com',
        password: '123456'
      }
    });

    // Create a mock response to capture the endpoint's response
    const response = createResponse();

    // Call the endpoint function with the mock request and response
    await app(request, response);
    const res =  response.json();

    // Assert that the endpoint returned a success status code and the correct response
    expect(response.statusCode).toBe(200);
    
  });

  test('should login a user', async () => { 
    const request = createRequest({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'doe@example.com',
        password: '123456'
      }
    });

    const response = createResponse();

    await app(request, response);
    const res = response.json();
    // console.log(await res._getData());

    expect(response.statusCode).toBe(200);
  })

});

describe('Todo endpoint', () => { 
    beforeEach( async() => { 
    await mongoose.connect('mongodb://localhost:27017/todo')

  })


  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

  });

  test('should register new task', async () => {

    const request = createRequest({
      method: 'POST',
      url: '/api/todo/create',
      body: {
        title: 'New todo task title',
        description: 'this is the todo description',
      }
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   

    expect(response.statusCode).toBe(200);

  });

  test('should update todo task', async () => {

    const request = createRequest({
      method: 'PUT',
      url: '/api/todo/:id',
      body: {
        title: 'Update todo task title',
        description: 'this is the updated todo description',
      }
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   

    expect(response.statusCode).toBe(200);

  });

  test('should delete todo task', async () => {

    const request = createRequest({
      method: 'DELETE',
      url: '/api/todo/:id',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

  test('should get specific todo task', async () => {

    const request = createRequest({
      method: 'GET',
      url: '/api/todo/:id',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

})

describe('Post endpoint', () => { 
    beforeEach( async() => { 
    await mongoose.connect('mongodb://localhost:27017/todo')

  })


  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

  });

  test('should register new post', async () => {

    const request = createRequest({
      method: 'POST',
      url: '/api/posts/create',
      body: {
        title: 'New post title',
        content: 'this is the post content',
      }
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   

    expect(response.statusCode).toBe(200);

  });

  test('should update post', async () => {

    const request = createRequest({
      method: 'PUT',
      url: '/api/posts/:id',
      body: {
        title: 'Update post title',
        content: 'this is the updated post content',
      }
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   

    expect(response.statusCode).toBe(200);

  });

  test('should delete post', async () => {

    const request = createRequest({
      method: 'DELETE',
      url: '/api/posts/:id',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

  test('should get specific post', async () => {

    const request = createRequest({
      method: 'GET',
      url: '/api/posts/:id',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

  test('should comment on a post', async () => {

    const request = createRequest({
      method: 'POST',
      url: '/api/posts/comment/:postId',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

})

describe('Admin endpoint', () => { 
    beforeEach( async() => { 
    await mongoose.connect('mongodb://localhost:27017/todo')

  })


  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

  });

  test('should get all users', async () => {

    const request = createRequest({
      method: 'POST',
      url: '/api/users/allUsers',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   

    expect(response.statusCode).toBe(200);

  });

  test('should get a specific user', async () => {

    const request = createRequest({
      method: 'GET',
      url: '/api/users/:userId',
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   

    expect(response.statusCode).toBe(200);

  });

  test('should create new user', async () => {

    const request = createRequest({
      method: 'POST',
      url: '/api/users/create',
      body: {
        name: 'New user name',
        email: 'user@example.com',
        password: 'password',
      }
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

  test('should update a user', async () => {

    const request = createRequest({
      method: 'PUT',
      url: '/api/users/:id',
      body: {
        name: 'New user name',
        email: 'user@example.com',
        password: 'password',
      }
    });

    const response = createResponse();

    await app(request, response);
    const res =  response.json();
   
    expect(response.statusCode).toBe(200);

  });

})
