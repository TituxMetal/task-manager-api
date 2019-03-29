const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../src/server')
const User = require('../src/models/user')

describe('POST /users', () => {
  const testUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tuxi',
    email: 'tuxi@gmail.com',
    password: 'Test1234$'
  }

  const userOne = {
    _id: new mongoose.Types.ObjectId(),
    name: 'User One',
    email: 'one@example.com',
    password: 'One1234$'
  }

  beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
  })

  it('should create and return a new user', async () => {
    const { body } = await request(server)
      .post('/users')
      .send(testUser)
      .expect(201)

    const { name, email } = testUser
    expect(body.user).toMatchObject({ name, email })
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
    const user = await User.findById(userOne._id)

    expect(user.password).not.toEqual(userOne.password)
  })

  it('should not create users if the same email already exists', async () => {
    const response = await request(server)
      .post('/users')
      .send({ name: 'Test User', email: userOne.email, password: 'Test1234$' })
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
