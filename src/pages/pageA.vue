<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
          
          <button @click="test">测试实现debounce，点击第{{ index }}次,显示第{{ showTimes }}次</button>
          <button @click="changeLanguage">{{ $t('m.changeLanguage') }}</button>
          <p>
            <button @click="showConfirm">{{ $t('m.show') + $t('m.frame') }}</button>
          </p>
          <div class="icon-img">

          </div>
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
import rotate from '@/components/rotate'

import crypto from 'crypto'

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
  },
  mounted() {
  },
  methods: {
    selectEvent() {
      this.showList = true
    },
    test() {
      this.index +=1;
      this.showTimesDebounce(123)
    },
    showTimesDebounce: debounce(function(data){
      this.showTimes +=1;
      // console.log('data', data)
    }, 1000, true),
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

<style lang="scss">
@import '~@/css/common.scss';
@import '~@/theme/sprites/sprite.scss';
@import '~@/theme/sprites/mine/sprite.scss';
.A{
  #video{
    width: 100%;
    height: 200px;
  }
  .icon-img{
    @include sprite($apple);
  }
}
</style>