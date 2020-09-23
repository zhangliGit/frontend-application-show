<template>
  <div>我是孙子组件</div>
</template>
<script>
export default {
  props: {},
  inject: ['color'],
  mounted() {
    console.log(this.color)
    console.log(this.$props)
    console.log(this.$listeners)
    console.log(this.$attrs)
  },
  methods: {
    change() {
      this.$listeners.change('123')
    }
  }
}
</script>