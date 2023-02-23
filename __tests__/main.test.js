const express = require('express');
const request = require('supertest');
const { createServer } = require('http');

jest.mock('express');

describe('Server startup', () => {
  const listenMock = jest.fn();
  const server = createServer();

  beforeEach(() => {
    express.mockImplementation(() => ({
      listen: listenMock.mockImplementation((port, callback) => {
        server.listen(port, callback);
        return server;
      }),
    }));
  });

  afterEach(() => {
    server.close();
    jest.clearAllMocks();
  });

  test('server starts correctly', async () => {
    require('../src/main');
    expect(express).toHaveBeenCalled();
    expect(listenMock).toHaveBeenCalledWith(3000, expect.any(Function));
  });
});
