const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const { jwtSecret } = require('../../src/config')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mike@example.com',
  password: '56what!!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, jwtSecret)
    }
  ]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Andrew',
  email: 'andrew@example.com',
  password: 'iLoveCats!!!',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, jwtSecret)
    }
  ]
}

const taskOneId = new mongoose.Types.ObjectId()
const taskOne = {
  _id: taskOneId,
  description: 'Task one',
  owner: userOneId
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
}

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  taskOneId,
  taskOne,
  setupDatabase
}
