const request = require('supertest')

const server = require('../src/server')
const User = require('../src/models/user')
const { userOne, userOneId, userTwo, userTwoId, setupDatabase } = require('./fixtures/database')

describe('Users routes', () => {
  const testUser = {
    name: 'Tuxi',
    email: 'tuxi@gmail.com',
    password: 'Test1234$'
  }

  beforeEach(async () => {
    await setupDatabase()
  })

  describe('POST /users => Create user', () => {
    it('should create and return a new user and a token', async () => {
      const { body } = await request(server)
        .post('/users')
        .send(testUser)
        .expect(201)

      const { name, email } = testUser
      expect(body.user).toMatchObject({ name, email })
      expect(body.token).toBeDefined()
    })

    it('should not return the user password field', async () => {
      const { body } = await request(server)
        .post('/users')
        .send(testUser)
        .expect(201)

      expect(body.user.password).not.toBe(testUser.password)
      expect(body.user.password).not.toBeDefined()
    })

    it('should hash the user password', async () => {
      const user = await User.findById(userOneId)

      expect(user.password).not.toEqual(userOne.password)
    })

    it('should not create users if the same email already exists', async () => {
      const response = await request(server)
        .post('/users')
        .send(userTwo)
        .expect(400)

      expect(response.error.text).toBe('User already exists: change your name or email')
    })

    it('should not create a user when no email or no password given', async () => {
      await request(server)
        .post('/users')
        .send({ name: 'invalid user' })
        .expect(400)

      const user = await User.findOne({ name: 'invalid user' })
      expect(user).toBeNull()
    })
  })

  describe('POST /users/login', () => {
    it('should login existing user', async () => {
      const { email, password } = userOne
      const response = await request(server)
        .post('/users/login')
        .send({ email, password })
        .expect(200)

      const { tokens } = await User.findById(userOneId)
      expect(response.body.token).toBe(tokens[1].token)
      expect(response.body.user.tokens).not.toBeDefined()
    })

    it('should not login nonexistent user', async () => {
      const { email, password } = testUser
      const response = await request(server)
        .post('/users/login')
        .send({ email, password })
        .expect(400)

      expect(response.body.token).not.toBeDefined()
      expect(response.error.text).toBe('Unable to login')
    })

    it('should not login user with bad credentials', async () => {
      const { email } = testUser
      const password = 'BadPassword'
      const response = await request(server)
        .post('/users/login')
        .send({ email, password })
        .expect(400)

      expect(response.body.token).not.toBeDefined()
      expect(response.error.text).toBe('Unable to login')
    })
  })
})
