const jwt = require('jsonwebtoken')

const User = require('../models/user')
const { jwtSecret } = require('../config')

const auth = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '')
    const { _id } = await jwt.verify(token, jwtSecret)
    const user = await User.findOne({ _id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user

    next()
  } catch (e) {
    const errorMessage = { error: 'Please authenticate.' }

    res.status(401).send(errorMessage)
  }
}

module.exports = auth
