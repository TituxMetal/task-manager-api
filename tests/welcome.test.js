const request = require('supertest')

const server = require('../src/server')

describe('GET /welcome', () => {
  it('should get a welcome message', async () => {
    const response = await request(server)
      .get('/welcome')
      .expect(200)

    expect(response.body.message).toBe('Welcome on Task Manager Api!')
  })
})
