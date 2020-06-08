<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="vue示例"></header-com>
    <scroll-list ref="scroll">
      <demo v-if="show"></demo>
      <div @click="change">刷新子组件</div>
      <div v-for="(value, key, index) in detail" :key="value">{{ value }}{{key}}{{index}}</div>
      <div v-for="(data, index) in dataList" :key="index">{{ data.name }}</div>
    </scroll-list>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
import demo from './demo'
export default {
  name: 'Home',
  components: {
    HeaderCom,
    ScrollList,
    demo
  },
  computed: {
  },
  data() {
    return { show: true, detail: {title: 'hello', val: 'world'}, dataList: [{name: 'hello'}] }
  },
  async mounted() {
  },
  methods: {
    change (e) {
      this.dataList[0].name = 'world'
      console.log(3)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
}
</style>
