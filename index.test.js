import request from 'supertest';
import { app } from './index.js';
import findChattiest from './findChattiest';

describe('Express Server', () => {
  test('POST /api/upload should return the chattiest users', async () => {
    // Create a mock file
    const file = {
      fieldname: 'files',
      originalname: 'test.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      destination: 'uploads/',
      filename: 'test.txt',
      path: 'uploads/test.txt',
      size: 12,
    };

    // Define the expected result
    const expectedChattiestUsers = [
      { username: '<user2>', wordCount: 23 },
      { username: '<user3>', wordCount: 18 },
      { username: '<user1>', wordCount: 13 },
    ];

    // Send a POST request with the mock file
    const response = await request(app)
      .post('/api/upload')
      .attach(
        'files',
        Buffer.from(`
        <user1> this is some chat words 
        <user2> the sky is blue 
        This line is still attributed 
        This line is still attributed! 
        <user1> more chat from me! 
        <user3> this is some chat words 1 
        <user3> this is some chat words 2 
        <user3> this is some chat words 3 
        <user2> the sky is blue  
        This line is still attributed 
        <user1> more chat from me!
      `),
        'test.txt'
      );

    expect(response.status).toBe(200);
    expect(response.body.chattiestUsers).toEqual(expectedChattiestUsers);
  });

  test('POST /api/upload should return the chattiest users for more users', async () => {
    // Create a mock file
    const file = {
      fieldname: 'files',
      originalname: 'test2.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      destination: 'uploads/',
      filename: 'test.txt',
      path: 'uploads/test.txt',
      size: 12,
    };

    // Define the expected result for the new test case
    const expectedChattiestUsers = [
      { username: '<Jane>', wordCount: 14 },
      { username: '<Kaine>', wordCount: 9 },
      { username: '<Garfield>', wordCount: 6 },
      { username: '<Roy>', wordCount: 5 },
      { username: '<Jack>', wordCount: 5 },
      { username: '<Albert>', wordCount: 4 },
      { username: '<Edward>', wordCount: 4 },
      { username: '<Nestle>', wordCount: 2 },
    ];

    // Send a POST request with the new set of chat messages
    const response = await request(app)
      .post('/api/upload')
      .attach(
        'files',
        Buffer.from(`
        <Roy> this is some chat words 
        <Jane> the sky is blue 
        This line is still attributed 
        This line is still attributed!
        <Albert> I wanna chat too! 
        <Garfield> this is some chat words 1 
        <Jack>no i dont this so
        <Edward> the sky is red?
        <Kaine> the sky is blue  
        This line is still attributed 
        <Nestle> Hi Guys!
      `),
        'test2.txt'
      );

    expect(response.status).toBe(200);
    expect(response.body.chattiestUsers).toEqual(expectedChattiestUsers);
  });

  test('POST /api/upload should return the chattiest users even all is numbers', async () => {
    // Create a mock file
    const file = {
      fieldname: 'files',
      originalname: 'test3.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      destination: 'uploads/',
      filename: 'test.txt',
      path: 'uploads/test.txt',
      size: 12,
    };

    // Define the expected result for the new test case
    const expectedChattiestUsers = [
      { username: '<user2>', wordCount: 8 },
      { username: '<user4>', wordCount: 6 },
      { username: '<user1>', wordCount: 5 },
      { username: '<user3>', wordCount: 4 },
    ];

    // Send a POST request with the new set of chat messages
    const response = await request(app)
      .post('/api/upload')
      .attach(
        'files',
        Buffer.from(`
        <user1> 123 123 51 5 1234 
        <user2> 1234 4 2 12
        123
        1223 1234
        123
        <user3> 1 34 234 12

        <user4> 123 234 123 43 12 1234 
      `),
        'test3.txt'
      );

    expect(response.status).toBe(200);
    expect(response.body.chattiestUsers).toEqual(expectedChattiestUsers);
  });

  // ... other test cases ...
});
