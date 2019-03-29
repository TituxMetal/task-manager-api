const mongoose = require('mongoose')

const { mongoUri, mongoOptions } = require('../config')

mongoose.connect(mongoUri, mongoOptions)
