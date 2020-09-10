<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    show() {
      this.title = 'hello'
      this.$nextTick(() => {
        console.log(document.querySelector('#title').innerHTML)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
