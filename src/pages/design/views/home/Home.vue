<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="设计模式"></header-com>
    <scroll-list ref="scroll">
      <div class="title">观察者模式</div>
      <div @click="change">触发</div>
    </scroll-list>
  </div>
</template>

<script>
import observer from './observer'
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
export default {
  name: 'Home',
  components: {
    HeaderCom,
    ScrollList,
  },
  computed: {
  },
  created () {
    observer.subscribe('click', (msg) => {
      console.log(msg, '我是created阶段')
    })
  },
  data() {
    return {
      title: '我是谁'
    }
  },
  async mounted() {
    observer.subscribe('click', (msg) => {
      console.log(msg, '我是mounted阶段')
    })
  },
  methods: {
    change () {
      observer.publish('click', '我是值啊')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
}
</style>
