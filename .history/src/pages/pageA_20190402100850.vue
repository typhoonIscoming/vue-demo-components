<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
          <!-- <selectList
            v-if="showList"
            v-model="selected"
            :option-list="list"
            :is-single="false"/>
          <div class="model-content"></div> -->
          <!-- <img :src="logo" /> -->
          <!-- <rotate
            :list="list"
          /> -->
          <button @click="test">测试实现debounce，点击第{{ index }}次,显示第{{ showTimes }}次</button>
        </div>
        <div
          class="bottom"
          @click="selectEvent">
            bottom
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import select from '@/components/multiSelect';
import logo from 'pic#/logo.png'
import rotate from '@/components/rotate'

import debounce from '@/utils/debounce'

export default {
  data() {
    return {
      list: [
        { id: 1, relation: '子女', mobile: '13558513096' },
        { id: 2, relation: '子女', mobile: '13558513095' },
      ],
      showList: true,
      selected: [],
      logo,
      index: 0,
      showTimes: 0,
      timer: null,
    };
  },
  components: {
    common,
    'selectList': select,
    rotate,
  },
  created() {
    let a = 9, b = 5;
    a = a ^ b;
    b = b ^ a;
    a = a ^ b;
    console.log('a', a, 'b', b)
  },
  mounted() {
  },
  methods: {
    selectEvent() {
      console.log(111111)
      this.showList = true
    },
    test() {
      this.index +=1
      const fn = this.debounce(() => {
        this.showTimes++
      })
      fn()
    },
    debounce(fn, delay = 300) {
    // 定时器，用来 setTimeout
    
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
        console.log(2222)
        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this
        var args = arguments
    
        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(this.timer)
    
        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        this.timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}
  },
  watch: {
    selected(newvalue) {
      console.log('this datavalue', newvalue)
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';
.A{
  #video{
    width: 100%;
    height: 200px;
  }
}
</style>