const request = require('supertest')

const server = require('../src/server')
const Task = require('../src/models/task')
const { userOne, setupDatabase } = require('./fixtures/database')

describe('Tasks routes', () => {
  beforeEach(setupDatabase)

  describe('POST /tasks', () => {
    it('should create a task for authenticated user', async () => {
      const { token } = userOne.tokens[0]
      const { body } = await request(server)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ description: 'Task One Test' })
        .expect(201)

      const { description } = await Task.findById(body._id)
      expect(body.description).toBe(description)
      expect(body.completed).toBeFalsy()
    })

    it('should not create a task if no description given', async () => {
      const { token } = userOne.tokens[0]
      await request(server)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ completed: true })
        .expect(400)
    })

    it('should not create task for unauthenticated user', async () => {
      const { body } = await request(server)
        .post('/tasks')
        .send({ description: 'Test' })
        .expect(401)

      expect(body.error).toBe('Please authenticate.')
    })
  })
})
