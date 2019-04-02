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
      debounce(() => {
        this.showTimes +=1
        console.log(11111)
      }, 500)
    },
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