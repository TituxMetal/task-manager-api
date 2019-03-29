const router = require('express').Router()

const User = require('../models/user')

router.post('/', async ({ body }, res) => {
  try {
    const foundUser = await User.findOne({ email: body.email })

    if (foundUser) {
      throw new Error('User already exists: change your name or email')
    }

    const user = await new User(body)
    const token = await user.generateAuthToken()

    await user.save()

    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = router
