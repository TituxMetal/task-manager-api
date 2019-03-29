const server = require('./server')

const { port } = require('./config')

server.listen(port, () => console.log(`Server is running on port: ${port}`))
