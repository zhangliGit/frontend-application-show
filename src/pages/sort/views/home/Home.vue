<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="排序算法"></header-com>
    <scroll-list ref="scroll">
      <div class="list-title">递归修改属性</div>
      <div>
        <div class="btn" @click="change">改变</div>
      </div>
      <div class="list-title">递归-计算</div>
      <div>
        <div class="btn" @click="total">斐波拉契题</div>
      </div>
      <div class="list-title">冒泡排序</div>
      <div>
        <div class="btn" @click="maopaoSort">排序</div>
      </div>
      <div class="list-title">选择排序</div>
      <div>
        <div class="btn" @click="chooseSort">排序</div>
      </div>
      <div class="list-title">插入排序</div>
      <div>
        <div class="btn" @click="insertSort">排序</div>
      </div>
      <div class="list-title">快速排序</div>
      <div>
        <div class="btn" @click="quickSort(arr, 0, arr.length - 1)">排序</div>
      </div>
      <div class="list-title">希尔排序</div>
      <div>
        <div class="btn" @click="shellSort()">排序</div>
      </div>
      <div class="list-title">归并排序</div>
      <div>
        <div class="btn" @click="togetSort()">排序</div>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import user from '@a/js/data.js'
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
      user,
      dataList: [
        {
          id: 1,
          name: '张立',
          children: [
            {
              id: 3,
              name: '小月月'
            }
          ]
        },
        {
          id: 2,
          name: '陈甜',
          children: {
            id: 4,
            name: '哈哈',
            children: {
              id: 5,
              name: '呵呵'
            }
          }
        }
      ],
      arr: [9, 4, 8, 2, 6, 3, 5]
    }
  },
  async mounted() {},
  methods: {
    maopaoSort() {
      // 冒泡排序
      let arr = [9, 4, 8, 2, 6, 3, 5]
      console.time('冒泡排序耗时')
      // for (let i = 0; i < arr.length; i++) {
      //   for (let j = 0; j < arr.length - 1; j++) {
      //     if (arr[j] > arr[j + 1]) {
      //       const tmp = arr[j + 1]
      //       arr[j + 1] = arr[j]
      //       arr[j] = tmp
      //     }
      //   }
      // }
      let low = 0
      let high = arr.length - 1
      while (low < high) {
        for (let j = 0; j < high; j++) {
          // 正向排序
          if (arr[j] > arr[j + 1]) {
            const tmp = arr[j + 1]
            arr[j + 1] = arr[j]
            arr[j] = tmp
          }
        }
        high--
        for (let j = high; j > low; j--) {
          // 反向排序
          if (arr[j] < arr[j - 1]) {
            const tmp = arr[j - 1]
            arr[j - 1] = arr[j]
            arr[j] = tmp
          }
        }
        low++
      }
      console.timeEnd('冒泡排序耗时')
      console.log(arr)
    },
    chooseSort() {
      const arr = [9, 4, 8, 2, 6, 3, 5]
      for (let i = 0; i < arr.length - 1; i++) {
        console.log(arr[i])
      }
      let minIndex, tmp
      console.time('选择排序耗时')
      for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j
          }
        }
        tmp = arr[minIndex]
        arr[minIndex] = arr[i]
        arr[i] = tmp
      }
      console.timeEnd('选择排序耗时')
      console.log(arr)
    },
    insertSort() {
      const arr = [9, 4, 8, 2, 6, 3, 5]
      for (let i = 1; i < arr.length; i++) {
        const key = arr[i]
        let j = i - 1
        while (arr[j] > key) {
          arr[j + 1] = arr[j]
          j--
        }
        arr[j + 1] = key
      }
      console.log(arr)
    },
    quickSort(arr, left, right) {
      if (left < right) {
        var x = arr[right],
          i = left - 1,
          temp
        for (let j = left; j < right; j++) {
          if (arr[j] <= x) {
            if (arr[j] <= x) {
              i++
              temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
            }
          }
          this.quickSort(arr, left, i - 1)
          this.quickSort(arr, i + 1, right)
        }
      }
      console.log(arr)
    },
    total() {
      console.log(this.getTotal(7))
    },
    getTotal(n) {
      if (n == 0 || n == 1) {
        return 1
      }
      return this.getTotal(n - 1) + this.getTotal(n - 2)
    },
    deep(data) {
      const _self = this
      let newObj = Array.isArray(data) ? [] : {}
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          newObj.push({
            code: data[i].id,
            title: data[i].name,
            children: data[i].children ? _self.deep(data[i].children) : null
          })
        }
      } else {
        for (let key in data) {
          newObj.code = data.id
          newObj.title = data.name
          newObj.children = data.children ? _self.deep(data.children) : null
        }
      }
      return newObj
    },
    change() {
      console.log(this.deep(this.dataList))
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: @main-color;
    color: #fff;
  }
  .list-title {
    padding: 10px;
    background-color: #ccc;
    color: #666;
  }
}
</style>
