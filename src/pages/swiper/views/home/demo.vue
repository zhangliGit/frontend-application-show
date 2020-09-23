<template>
  <div>
    <div v-if="value">是否显示</div>
    <div>{{ title}}</div>
    <div @click="change">改变</div>
    <son type="2" @click="change" v-bind="$attrs" v-on="$listeners"></son>
  </div>
</template>
<script>
import son from './son'
export default {
  components: {
    son
  },
  inject: ['color'],
  props: {
    title: {
      type: String || Number,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log(this.$parent)
    console.log(this.$props)
    console.log(this.$listeners)
    console.log(this.$attrs)
  },
  methods: {
    change() {
      // this.$emit('input', false)
      this.$emit('update:changeTag', false)
      this.$listeners.change('123')
    }
  }
}
</script>