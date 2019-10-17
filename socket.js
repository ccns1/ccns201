const SocketIO = require('socket.io')
const socketIO = new SocketIO({
  path: '/websocket'
})

let userList = {
  list: [],
  add(user) {
    this.list.push(user)
    return this
  },
  del(id) {
    this.list = this.list.filter(u => u.id !== id)
    return this
  },
  sendAllUser(name, data) {
    this.list.forEach(({ id }) => {
      console.log('>>>>>', id)
      socketIO.to(id).emit(name, data)
    })
    return this
  },
  findName(id) {
    return this.list.find(u => u.id === id).name
  }
}

socketIO.on('connection', function(socket) {
  console.log('连接加入.', socket.id)

  socket.on('addUser', function(data) {
    console.log(data.name, '加入房间')
    let user = {
      id: socket.id,
      name: data.name,
      calling: false
    }
    userList.add(user).sendAllUser('updateUserList', userList.list)
  })

  socket.on('sendMessage', ({ content }) => {
    console.log(content)
    userList.sendAllUser('updateMessageList', { userId: socket.id, content, user: userList.findName(socket.id) })
  })

  socket.on('disconnect', () => {
    // 断开删除
    console.log('连接断开', socket.id)
    userList.del(socket.id).sendAllUser('updateUserList', userList.list)
  })
})

module.exports = socketIO
