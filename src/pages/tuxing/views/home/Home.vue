<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="示例"></header-com>
    <scroll-list ref="scroll">
      <div @click="show">展示图片</div>
      <div ref="preload"></div>
      <img :src="myImg" />
    </scroll-list>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
import Tesseract from 'tesseract.js'
export default {
  name: 'Home',
  components: {
    HeaderCom,
    ScrollList
  },
  computed: {
  },
  data() {
    return {imgArr: [], preload: '', myImg: ''}
  },
  async mounted() {
    const newImg = new Image()
    newImg.setAttribute('crossOrigin', 'anonymous');
    newImg.src = 'https://upload-images.jianshu.io/upload_images/5540636-cee76025921a7823.png?imageMogr2/auto-orient/strip|imageView2/2/w/541/format/webp'
    newImg.onload = () => {
      // var canvas = document.createElement('canvas')
      // canvas.width = newImg.width
      // canvas.height = newImg.height
      // const context = canvas.getContext('2d')
      // context.drawImage(newImg,0,0,newImg.width, newImg.height,);
      // const base64 = canvas.toDataURL('image/png')
      // console.log(base64)
      this.imgArr.push(newImg)
    }
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open('get', 'https://upload-images.jianshu.io/upload_images/5540636-cee76025921a7823.png?imageMogr2/auto-orient/strip|imageView2/2/w/541/format/webp')
    xmlHttp.send()
    xmlHttp.responseType = "blob";
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        const res = xmlHttp.response
        const read = new FileReader()
        read.onload = () => {
          this.myImg = read.result
        }
        read.readAsDataURL(res)
       //  const url = URL.createObjectURL(res)
      }
    }
    if (navigator.onLine) {
      console.log('online')
    } else  {
      console.log('outline')
    }
  },
  methods: {
    show () {
      console.log(2)
      this.$refs.preload.appendChild(this.imgArr[0])
    }
  }
}
</script>

<style lang="less" scoped>
.home {
}
</style>
