const express = require('express')

require('./database/mongo')

const server = express()

server.use(express.json())
server.use('/welcome', require('./routes/welcome'))
server.use('/users', require('./routes/users'))
server.use('/tasks', require('./routes/tasks'))

module.exports = server
