<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
          <selectList
            v-if="showList"
            v-model="selected"
            :option-list="list"
            :is-single="false"/>
          <div class="model-content"></div>
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
import select from '@/components/multiSelect'
export default {
  data() {
    return {
      list: [
        { id: 1, relation: '子女', mobile: '13558513096' },
        { id: 2, relation: '子女', mobile: '13558513095' },
      ],
      showList: false,
      selected: [],
    };
  },
  components: {
    common,
    'selectList': select,
  },
  created() {
    let a = 9, b = 5;
    a = a ^ b;
    b = b ^ a;
    a = a ^ b;
    console.log('a', a, 'b', b)
  },
  methods: {
    selectEvent() {
      console.log(111111)
      this.showList = true
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

</style>