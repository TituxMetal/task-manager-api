const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/', auth, async ({ body, user }, res) => {
  const owner = user._id
  const task = new Task({
    ...body,
    owner
  })

  try {
    await task.save()

    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = router
