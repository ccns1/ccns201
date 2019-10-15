const http = require('http')
const app = require('../app')

const server = http.createServer(app.callback())

server.listen(3000, () => {
  console.log('server start on 127.0.0.1:3000')
})
