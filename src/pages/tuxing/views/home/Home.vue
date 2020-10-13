<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="示例"></header-com>
    <scroll-list ref="scroll">
      <input type="file" id="file" name="file" />
      <a @click="uploading" href="javascript:;">上传</a>
    </scroll-list>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
export default {
  name: 'Home',
  components: {
    HeaderCom,
    ScrollList
  },
  computed: {},
  data() {
    return {
      img:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAABNCAYAAACbtucRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGCGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MGExYmZlOS1mYWY3LWQ2NDYtYTVkZS1lMjBlMzIzNTIyYTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzAyQUZCNEZCQjZGMTFFQTg1MkQ4RjM4NDg4ODhEQkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzBmZjNkNmMtYTgzYy01NTQ5LWE1OGQtNjEyNTg4MzY1ZTgxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIg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'
    }
  },
  async mounted() {
    this.getOssToken()
  },
  methods: {
    getOssToken() {},
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',')
      //注意base64的最后面中括号和引号是不转译的
      var _arr = arr[1].substring(0, arr[1].length - 2)
      var mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(_arr),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    mounted() {},
    getSuffix() {
      const fileName = document.getElementById('file').value
      var pos = fileName.lastIndexOf('.')
      var suffix = ''
      if (pos != -1) {
        suffix = fileName.substring(pos)
      }
      return suffix
    },
    uploading() {
      this.upload('CANPOINTLIVE', document.getElementById('file').files[0], this.getSuffix())
    },
    upload(schoolCode, file, fileType = '.jpg') {
      console.log(typeof file)
      const _self = this
      axios
        .get('http://canpointlive.com:8090/ossApi/oss-policy?schoolCode=CANPOINTLIVE&fileName=' + fileType)
        .then(function(res) {
          _self.aliyunOssToken = res.data.data
          var formData = new FormData()
          //注意formData里append添加的键的大小写
          console.log(_self.aliyunOssToken)
          formData.append('key', _self.aliyunOssToken.startsWith) //存储在oss的文件路径
          formData.append('OSSAccessKeyId', _self.aliyunOssToken.OSSAccessKeyId) //accessKeyId
          formData.append('policy', _self.aliyunOssToken.policy) //policy
          formData.append('callback', _self.aliyunOssToken.callback)
          formData.append('Signature', _self.aliyunOssToken.signature) //签名
          //如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
          formData.append('file', document.getElementById('file').files[0])
          formData.append('success_action_status', 200) //成功后返回的操作码
          console.log(formData)
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
          axios.post('/upload', formData).then(function(res) {
            console.log(111, res)
            // 返回 Promise对象数据
          })
          // axios({
          //   url: '/upload',
          //   type: 'POST',
          //   data: formData,
          //   success: function(res) {
          //     console.log(res)
          //   },
          //   error: function(data) {
          //     console.log(data)
          //   }
          // })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
}
</style>
