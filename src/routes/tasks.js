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

router.patch('/:id', auth, async ({ body, params, user }, res) => {
  const updates = Object.keys(body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  const _id = params.id
  const owner = user._id

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates.' })
  }

  try {
    const task = await Task.findOne({ _id, owner })

    if (!task) {
      return res.status(404).send({ error: 'No task found.' })
    }

    updates.forEach(update => (task[update] = body[update]))
    await task.save()

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
