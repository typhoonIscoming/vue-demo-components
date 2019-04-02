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
    this.initPlayer()
  },
  methods: {
    selectEvent() {
      console.log(111111)
      this.showList = true
    },
    initPlayer() {
      
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