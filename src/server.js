const express = require('express')

const server = express()

server.use(express.json())
server.use('/welcome', require('./routes/welcome'))

module.exports = server
