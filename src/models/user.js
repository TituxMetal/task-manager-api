const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const _id = user.id.toString()
  const token = await jwt.sign({ _id }, jwtSecret, { expiresIn: '7 days' })

  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

userSchema.pre('save', async function() {
  const user = this

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User
