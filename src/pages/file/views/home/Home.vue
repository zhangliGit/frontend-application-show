<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="文件操作"></header-com>
    <scroll-list ref="scroll">
      <div class="title">canvas对图片进行压缩裁剪</div>
      <div class="box">
        <div class="file">
          选取文件
          <input @change="zipFile($event)" type="file" accept="image/*" />
        </div>
        <div>
          <img :src="url" alt />
        </div>
      </div>
      <div class="title">Blob</div>
      <div>
        <div class="file" @click="change">转化</div>
      </div>
      <div class="title">文件读取</div>
      <div class="box qui-fx">
        <div class="file">
          上传文件
          <input capture="camera" @change="chooseFile($event)" type="file" accept="image/*" />
        </div>
        <div>
          <img :src="imgData" alt />
        </div>
      </div>
      <div class="title">生成下载文件</div>
      <div class="box">
        <div>{{ txt }}</div>
        <a id="down" class="file" download="a.txt">下载</a>
      </div>
      <div class="title">批量上传</div>
      <div class="box qui-fx">
        <div class="file">
          上传文件
          <input
            @change="chooseMore($event)"
            multiple="multiple"
            type="file"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div>
          <img :src="pic" v-for="(pic, index) in moreImg" :key="index" alt />
        </div>
      </div>
      <div class="title">分割上传</div>
      <div class="box">
        <div class="file">
          选取文件
          <input @change="showFile($event)" type="file" accept="image/*" />
        </div>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
import BMF from 'browser-md5-file'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HeaderCom,
    ScrollList
  },
  computed: {},
  data() {
    return {
      txt: '我是被下载的内容',
      imgData: '',
      moreImg: [],
      url: ''
    }
  },
  mounted() {
    this.down()
  },
  methods: {
    zipFile($ev) {
      const file = $ev.target.files[0]
      const url = URL.createObjectURL(file)
      const newImg = new Image()
      newImg.src = url
      newImg.onload = () => {
        var canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 400
        const context = canvas.getContext('2d')
        context.rotate(90*Math.PI/180)
        context.drawImage(newImg,0,0,newImg.width, newImg.height, 0, -200, 400, 200);
        const base64 = canvas.toDataURL('image/png')
        console.log(base64)
        this.url = base64
        console.log(base64.length)
      }
    },
    change() {
      const blob = new Blob(['haha'], {})
      console.log(blob.length.length)
    },
    down() {
      // 创建本地的url地址
      const blob = new Blob([this.txt], { type: 'text/plain,charset=UTF-8' })
      const nUrl = URL.createObjectURL(blob)
      document.getElementById('down').href = nUrl
    },
    // 分割上传
    uploadFile(file, index) {
      // 参数序列化
      let formData = new FormData()
      formData.append('file', file)
      formData.append('index', index)
      axios({
        url: 'http://localhost:3001/upload-img',
        method: 'POST',
        data: formData,
        timeout: 0, //无超时
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        console.log('上传成功', index)
      })
      // axios.post('/upload', this.blob, {}).then(function() {})
    },
    // 分割上传
    showFile($ev) {
      const chunkSize = 4000
      let start = 0
      let end = chunkSize
      const file = $ev.target.files
      // 获取文件的md5
      const bmf = new BMF()
      bmf.md5(file[0], function(err, md5) {
        console.log(md5)
      })
      // 转化为二进制数据进行分割
      console.log(file[0])
      this.blob = new Blob(file)
      console.log(this.blob)
      let i = 0
      this.timer = setInterval(() => {
        i++
        console.log(start, end)
        this.uploadFile(this.blob.slice(start, end), i)
        start = end
        end += chunkSize
        if (start > this.blob.size) {
          axios({
            url: 'http://localhost:3001/merge_chunks',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
            console.log('成功')
            this.imgData = res.data.url
          })
          clearInterval(this.timer)
        }
      }, 2000)
    },
    // 单张图片上传
    chooseFile($ev) {
      const file = $ev.target.files[0]
      console.log($ev.target.files)
      const reader = new FileReader()
      reader.onload = () => {
        const imgData = reader.result
        this.imgData = imgData
        // let buf = new Buffer(imgData).toString('base64')
        // this.imgData = 'data:image/png;base64,' + buf
      }
      // 把文件转化为base64
      reader.readAsDataURL(file)
      // 读取文件的文本内容
      // reader.readAsText(file)
      // reader.readAsBinaryString(file)
      // reader.readAsArrayBuffer(file)
    },
    // 批量上传
    chooseMore($ev) {
      const file = $ev.target.files
      let formData = new FormData()
      var arr = []
      for (let i = 0; i < file.length; i++) {
        formData.append('upfile[]', file[i])
        {
          const reader = new FileReader()
          reader.onload = function() {
            arr.push(reader.result)
          }
          reader.readAsDataURL(file[i])
        }
      }
      axios({
        url: 'http://localhost:3001/upload-file-multi',
        method: 'POST',
        data: formData,
        timeout: 0, //无超时
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {
        this.moreImg = arr
        console.log(arr)
        console.log('上传成功')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .title {
    height: 60px;
    background-color: #ccc;
    color: #666;
    line-height: 60px;
    padding-left: 20px;
  }
  .box {
    padding: 10px 10px;
    img {
    }
  }
  .file {
    display: block;
    width: 200px;
    height: 76px;
    border-radius: @radius;
    text-align: center;
    padding: 20px 0;
    background-color: @main-color;
    color: #fff;
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
}
</style>
