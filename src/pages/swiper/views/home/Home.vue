<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="swiper示例"></header-com>
    <scroll-list ref="scroll">
      <div class="slide-box">
        <swiper class="swiper-h" ref="mySwiper" :options="swiperOptions">
          <swiper-slide>Slide 1 </swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 4</swiper-slide>
          <swiper-slide>Slide 5</swiper-slide>
          <swiper-slide>Slide 6</swiper-slide>
          <swiper-slide>Slide 7</swiper-slide>
          <swiper-slide>Slide 8</swiper-slide>
          <swiper-slide>Slide 9</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <div @click="change">chang</div>
    </scroll-list>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Home',
  components: {
    HeaderCom,
    ScrollList,
    Swiper,
    SwiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  data() {
    return {
      swiperOptions: {
        // 鼠标控制
        mousewheel: true,
        // 切换效果
        // effect: 'cube',
        // cubeEffect: {
        //   slideShadows: true,
        //   shadow: true,
        //   shadowOffset: 100,
        //   shadowScale: 0.6
        // },
        // 栅格配置，可视区域显示几个，每个间隔多少
        slidesPerView: 4,
        spaceBetween: 10,
        // 微缩图
        // thumbs: {
        //   swiper: thumbsSwiper
        // },
        // 左右按钮配置
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 是否可以循环滚动
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          // 设置手动滑动之后可以继续自动滑动
          disableOnInteraction: false
        },
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          // type: 'fraction'
          // type: 'progressbar'
          // type: 'custom'
          clickable: true
        }
      }
    }
  },
  async mounted() {
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    change() {
      this.swiper.slideTo(3, 1000, false)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .slide-box {
    width: 800px;
    margin: 0 auto;
    position: relative;
  }
  .swiper-slide {
    width: 100px;
    height: 100px;
    background-color: #ccc;
  }
  .swiper-h {
    height: 300px;
  }
  .swiper-button-next {
  }
  .swiper-button-prev {
  }
}
</style>
