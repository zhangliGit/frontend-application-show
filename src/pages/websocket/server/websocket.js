/**
 * @description 简单的聊天功能
 */

var ws = require('nodejs-websocket')
console.log('开始建立websocket连接...')
// 存在用户连接信息
const userList = []
// 存储连接队列
const wsList = []
// 广播在线人员
const boardcast = data => {
  wsList.forEach(conn => {
    conn.sendText(JSON.stringify(data))
  })
}
// 广播消息
const boardMsg = data => {
  wsList.forEach(conn => {
    conn.sendText(JSON.stringify(data))
  })
}
ws.createServer(function(conn) {
  conn.on('text', function(str) {
    const data = JSON.parse(str)
    if (data.type === 'in') {
      console.log(`用户${data.userName}已连接`)
      // 存储用户和连接队列
      userList.push(data)
      // 新增到连接队列
      wsList.push(conn)
      // 把上线用户推送给所有人
      // 可以优化
      boardcast({
        type: 'in',
        data: userList,
        userName: data.userName
      })
    } else if (data.type === 'send') {
      // 广播消息
      console.log(data)
      boardMsg(data)
    } else if (data.type === 'sendOne') {
      // 单聊
      const index = userList.findIndex(item => item.userId === data.toId)
      console.log(index, data.toId, data.toName)
      wsList[index].sendText(JSON.stringify(data))
    } else if (data.type === 'out') {
      console.log(`用户${data.userName}已下线`)
      const index = userList.findIndex(item => item.userId === data.userId)
      // 把下线用户推送给所有人
      boardcast(data)
      // 服务端下线人员
      userList.splice(index, 1)
      wsList.splice(index, 1)
    }
  })
  conn.on('close', function(code, reason) {
    console.log(code, reason)
    console.log('关闭连接')
  })
  conn.on('error', function(code, reason) {
    console.log(code, reason)
    console.log('异常关闭')
  })
}).listen(8001)
console.log('WebSocket建立完毕')
