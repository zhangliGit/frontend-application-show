<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="界面布局" @click.native="getView"></header-com>
    <div id="scrollList" class="qui-fx-f1" style="overflow-y: auto">
      <div class="qui-title">css盒子模型</div>
      <div style="box-sizing: content-box">
        <div style="width: 120px; height: 120px; background: #000; border:10px #ccc solid"></div>
      </div>
      <div class="qui-title">div水平排列滚动</div>
      <div>
        <div
          class="scrollx"
          style="width: 400px; height: 120px; white-space: nowrap; overflow-y: hidden; overflow-x: scroll; margin: 0 auto; background: #ccc"
        >
          <div
            v-for="i in 10"
            :key="i"
            style="margin-right: 20px;height: 100px; width: 60px; background: #000; display: inline-block"
          ></div>
        </div>
      </div>
      <div class="qui-title">div滚动条样式</div>
      <div>
        <div
          class="scrolly"
          style="width: 400px; height: 120px; overflow-y: scroll; overflow-x: hidden; margin: 0 auto; background: #ccc"
        >
          <div
            v-for="i in 10"
            :key="i"
            style="margin-bottom: 20px;height: 100px; width: 60px; background: #000"
          ></div>
        </div>
      </div>
      <div class="view">
        <img class="view-img" src="https://avatar.csdnimg.cn/3/5/E/3_yufengaotian.jpg" data-src="http://www.manongjc.com/Public/images/logo.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
export default {
  name: 'Home',
  components: {
    HeaderCom,
  },
  data() {
    return {}
  },
  async mounted() {
    document.querySelector('#scrollList').addEventListener('scroll', () => {
      this.getView()
    })
    this.img = document.querySelector('.view-img')
    this.height = document.documentElement.clientHeight
    this.$nextTick(() => {
      this.getView()
    })
  },
  methods: {
    getView() {
      const viewRect = document.querySelector('.view').getBoundingClientRect()
      if (viewRect.top < this.height) {
        console.log('可视区域')
        this.img.src = this.img.dataset.src
      } else {
        this.img.src = ''
        console.log('不在可视区域')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.view {
  width: 300px;
  margin-top: 800px;
  margin-left: 100px;
  height: 400px;
  background-color: #ccc;
}
.scrolly::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
}
.scrollx::-webkit-scrollbar {
  height: 10px;
}

/*定义滚动条的轨道颜色、内阴影及圆角*/

::-webkit-scrollbar-track {
  background-color: #666;
}

/*定义滑块颜色、内阴影及圆角*/

::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}

/*定义两端按钮的样式*/

::-webkit-scrollbar-button {
  height: 0;
  background-color: #666;
}

/*定义右下角汇合处的样式*/

::-webkit-scrollbar-corner {
  background: khaki;
}
.home {
  .data-list {
    background-color: #fff;
    padding: 20px 10px;
  }
}
</style>
