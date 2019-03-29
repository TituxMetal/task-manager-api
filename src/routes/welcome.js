const express = require('express')

const router = new express.Router()

router.get('/', (_req, res) => {
  res.send({ message: 'Welcome on Task Manager Api!' })
})

module.exports = router
