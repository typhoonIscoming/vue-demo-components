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
          <button @click="changeLanguage">{{ $t('m.changeLanguage') }}</button>
          <p>
            <button @click="showConfirm">{{ $t('m.show') + $t('m.frame') }}</button>
          </p>
        </div>
        <div
          class="bottom"
          @click="selectEvent">
            {{ $t('m.bottom') }}
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import select from '@/components/multiSelect';
import logo from 'pic#/logo.png'
import rotate from '@/components/rotate'

import { debounce } from '@/utils/debounce'

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
    // console.log('a', a, 'b', b)
  },
  mounted() {
    console.log(this.$t('m.bottom'))
  },
  methods: {
    selectEvent() {
      this.showList = true
    },
    test() {
      this.index +=1;
      this.showTimesDebounce(123)
    },
    showTimesDebounce: debounce(function(){
      this.showTimes +=1;
    }),
    changeLanguage: debounce(function(){
      const lang = this.$i18n.locale
      if(lang === 'en') {
        this.$i18n.locale = 'zh-CN'
      } else if(lang === 'zh-CN') {
        this.$i18n.locale = 'en'
      }
    }),
    showConfirm() {
      this.$vux.confirm.show({
        title: this.$t('m.title'),
        content: this.$t('m.content'),
        confirmText: this.$t('m.confirm'),
        cancelText: this.$t('m.cancel'),
        onConfirm: () => {
          console.log('print', this.$t('m.confirm'))
        },
        onCancel: () => {
          console.log('print', this.$t('m.cancel'))
        },
      })
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