const SocketIO = require("socket.io")
const socketIO = new SocketIO({
  path: "/websocket"
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
  sendAllUser(name, socket) {
    this.list.forEach(({ id }) => {
      console.log('>>>>>', id)
      socketIO.to(id).emit(name, this.list)
    })
    return this
  }
}

socketIO.on("connection", function(socket) {
  console.log('连接加入.', socket.id)

  socket.on("addUser", function(data) {
    console.log(data.name, '加入房间')
    let user = {
      id: socket.id,
      name: data.name,
      calling: false
    }
    userList.add(user).sendAllUser("updateUserList", socket)

  })

  socket.on("disconnect", () => {
    // 断开删除
    console.log('连接断开', socket.id);
    userList.del(socket.id).sendAllUser("updateUserList", socket)
  })
})

module.exports = socketIO
