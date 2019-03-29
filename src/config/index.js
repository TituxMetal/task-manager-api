module.exports = {
  port: process.env.PORT || 5000,
  mongoOptions: { useCreateIndex: true, useNewUrlParser: true },
  mongoUri: process.env.MONGODB_URI || 'mongodb://mongo:27017/test',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjsonwebtoken'
}
