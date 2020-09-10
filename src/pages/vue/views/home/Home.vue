<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="vue示例"></header-com>
    <scroll-list ref="scroll">
      <div :class="['act1', {'act': true}]">fsf</div>
      <div :style="{display: true ? 'block' : 'null'}">1212</div>
      <div v-if="tag">是否心思</div>
      <div>
        <demo
          @click="showDialog"
          :changeTag.sync="tag"
          ref="demo"
          v-model="show"
          prop="我是父组件传递的值"
          data="haha"
          :title="title"
          @change="change1"
        ></demo>
      </div>
      <div @click="change">刷新子组件</div>
      <div v-for="(value, key, index) in detail" :key="value">{{ value }}{{key}}{{index}}</div>
      <div v-for="(data, index) in dataList" :key="index">{{ data.name }}</div>
    </scroll-list>
  </div>
</template>

<script>
import Vue from 'vue'
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
  provide() {
    return {
      color: new Vue({
        data() {
          return { foo: 'bar' }
        }
      })
    }
  },
  computed: {},
  data() {
    return {
      title: '标题',
      show: true,
      tag: true,
      detail: { title: 'hello', val: 'world' },
      dataList: [{ name: 'hello' }]
    }
  },
  async mounted() {
    console.log(this.$children)
  },
  methods: {
    showDialog(e) {
      console.log(e)
    },
    change1(data) {
      this.title = data
    },
    change(e) {
      this.dataList[0].name = 'world'
      console.log(3)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .act {
    color: red;
  }
  .act1 {
    background: green;
  }
}
</style>
