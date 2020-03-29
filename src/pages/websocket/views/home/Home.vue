<template>
  <div class="home qui-page qui-fx-ver">
    <van-popup :close-on-click-overlay="false" v-model="isShow" style="border-radius: 6px">
      <div style="padding: 20px;" class="qui-fx-ac-jc">
        <van-field style="text-align:center" v-model="loginName" placeholder="请输入用户名" />
        <van-button @click="entry" type="primary" style="margin-top: 20px">进入聊天室</van-button>
      </div>
    </van-popup>
    <header-com title="websocket聊天室"></header-com>
    <div class="qui-fx-f1 qui-fx">
      <div class="user-list">
        <ul>
          <li>联系人</li>
          <li
            :id="'user' + user.userId"
            :class="{ act: user.userId === singleUser.userId && chartType === 1 }"
            @click="chooseUser(user)"
            v-for="user in userList"
            :key="user.userId"
          >
            <div class="newTip"></div>
            {{ user.userName }}
          </li>
        </ul>
      </div>
      <div class="qui-fx-f1 qui-fx-ver">
        <div class="chart-type qui-fx-ac qui-fx-jc">
          <van-tabs type="card" v-model="chartType">
            <van-tab title="群聊"></van-tab>
            <van-tab title="单聊"></van-tab>
          </van-tabs>
        </div>
        <div class="chart-box qui-fx-f1">
          <div
            :class="['chart-list', { 'qui-fx-ac-je': currentInfo.userId === chart.userId }]"
            v-for="chart in chartList[type]"
            :key="chart.date"
          >
            <div class="box">
              <div>{{ chart.userName }}</div>
              <div v-if="chart.msgType === 'file'">
                <img style="max-width: 100px" :src="chart.fileData" alt="" />
              </div>
              <div v-if="chart.msgType === 'text'">{{ chart.msg }}</div>
            </div>
          </div>
        </div>
        <div class="send-box qui-fx qui-fx-ac">
          <div class="btn file">
            文件
            <input @change="chooseFile($event)" type="file" accept="image/*" />
          </div>
          <input v-model="message" placeholder="请输入聊天信息" class="qui-fx-f1" type="text" />
          <div class="btn" @click="send('text')">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
export default {
  name: 'Home',
  components: {
    HeaderCom
  },
  computed: {},
  data() {
    return {
      singleUser: {},
      loginName: '',
      isShow: true,
      isLoign: false, // 是否登录
      currentInfo: {
        // 存储当前人聊天信息
      },
      type: '0', // 存储当前群聊和单聊的人员标识
      chartList: {
        '0': [] // 默认群聊
      }, // 存储聊天消息，包括群聊和单聊
      userList: [], // 存储聊天人列表
      chartType: 0, // 默认群聊
      message: ''
    }
  },
  watch: {
    chartType(n) {
      if (n === 0) {
        this.type = 0
      } else {
        this.type = this.singleUser.userId
      }
    }
  },
  mounted() {
    window.onbeforeunload = () => {
      this.onOrOut('out')
    }
    if (window.WebSocket) {
      this.ws = new WebSocket('ws://localhost:8001')
      this.ws.onopen = () => {
        console.log('连接服务器成功')
      }
      this.ws.onclose = () => {
        console.log('服务器关闭')
      }
      this.ws.onerror = () => {
        console.log('连接出错')
      }
      // 接收服务器的消息
      // type in 进入聊天的人员
      // type out 退出聊天的人员
      // type send 收到群发消息
      // type sendOne 收到单人聊天消息
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        // 上线
        if (data.type === 'in') {
          this.userList = data.data
          this.$notify(`${data.userName}上线啦`)
        } else if (data.type === 'send') {
          // 群聊
          this.chartList['0'].push(data)
        } else if (data.type === 'sendOne') {
          // 单聊
          if (!this.chartList[data.userId]) {
            this.chartList[data.userId] = []
          }
          this.chartList[data.userId].push(data)
          // 如果发送人不是当前聊天人，则显示红色
          if (data.userId !== this.singleUser.userId) {
            document.querySelector('#user' + data.userId).querySelector('.newTip').style.display = 'block'
          }
          this.$forceUpdate()
        } else if (data.type === 'out') {
          // 下线
          this.userList.splice(
            this.userList.findIndex(item => item.userId === data.userId),
            1
          )
          this.$notify(`${data.userName}下线啦`)
        }
      }
    }
  },
  methods: {
    chooseUser({ userId, loginName } = user) {
      if (this.chartType === 0) return
      // 选择单聊人员
      this.singleUser = {
        userId,
        userName: loginName
      }
      // 隐藏单聊人员的标记信息
      document.querySelector('#user' + userId).querySelector('.newTip').style.display = 'none'
      // 存储单聊人员的属性，群聊为0
      this.type = userId
    },
    entry() {
      if (this.loginName === '') {
        this.$notify('请输入姓名')
        return
      }
      this.currentInfo = {
        userId: Math.floor(Math.random() * 10000000),
        userName: this.loginName
      }
      this.isShow = false
      this.isLoign = true
      this.onOrOut('in')
    },
    onOrOut(type) {
      // 进入聊天室
      const data = JSON.stringify({
        type,
        ...this.currentInfo
      })
      this.ws.send(data)
    },
    chooseFile($ev) {
      const reader = new FileReader()
      reader.onload = () => {
        let imgBase = reader.result
        console.log(imgBase)
        this.fileData = imgBase
        this.send('file')
      }
      console.log($ev.target.files)
      reader.readAsBinaryString($ev.target.files[0])
      // reader.readAsDataURL($ev.target.files[0])
    },
    send(msgType) {
      // 发送消息
      if (this.message === '' && msgType === 'text') {
        this.$toast('请输入聊天内容')
        return
      }
      if (this.chartType === 1 && !this.singleUser.userId) {
        this.$toast('请选择单聊人员')
        return
      }
      // 群聊和单聊发送
      const data = {
        type: this.chartType ? 'sendOne' : 'send',
        msgType,
        userId: this.currentInfo.userId,
        userName: this.currentInfo.userName,
        toId: this.singleUser.userId,
        toName: this.singleUser.userName,
        fileData: msgType === 'file' ? this.fileData : '',
        msg: msgType === 'text' ? this.message : '',
        date: new Date().getTime()
      }
      if (this.chartType === 1) {
        if (!this.chartList[this.singleUser.userId]) {
          this.chartList[this.singleUser.userId] = []
        }
        this.chartList[this.singleUser.userId].push(data)
      }
      this.$forceUpdate()
      this.ws.send(JSON.stringify(data))
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .user-list {
    overflow: auto;
    width: 220px;
    border-right: 1px #ddd solid;
    li {
      border-bottom: 1px #ddd solid;
      height: 80px;
      line-height: 80px;
      padding-left: 1rem;
      position: relative;
      &.act {
        background-color: #444;
        color: #fff;
      }
      .newTip {
        display: none;
        position: absolute;
        z-index: 99;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: red;
        top: 35px;
        right: 20px;
      }
    }
  }
  .chart-type {
    height: 80px;
    border-bottom: 1px #ddd solid;
  }
  .chart-box {
    background-color: #f5f5f5;
    padding: 30px;
    overflow-y: scroll;
  }
  .chart-list {
    line-height: 40px;
    margin: 20px 0;
    .box {
      color: #666;
      min-width: 200px;
      max-width: 300px;
      padding: 10px;
      border-radius: @main-color;
      background-color: #ccc;
    }
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #aadffd;
    border-color: #78c3f3;
    color: #004974;
    text-decoration: none;
  }
  .send-box {
    height: 2.8rem;
    border-top: 1px #eee solid;
    padding: 0 15px;
    input {
      border: 1px #eee solid;
      border-radius: @radius;
      height: 2.4rem;
      padding-left: 10px;
    }
    .btn {
      margin-left: 15px;
      height: 2.4rem;
      line-height: 2.4rem;
      padding: 0 40px;
      color: #fff;
      border-radius: @radius;
      background-color: @main-color;
    }
  }
}
</style>
