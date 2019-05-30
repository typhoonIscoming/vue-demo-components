<template>
    <div class="B common">
        <common title="b"></common>
        <div class="content">
          <a :href="'sms:' + linkPeople">{{ $t('m.sendSMS') }}</a>
          <select-item
            class="select-item"
            @click.native="comEvent"/>
        </div>
        <div class="bottom">
          b{{ $t('m.page') }}
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import selectItem from '@/components/pageB/selected'
export default {
  data() {
    return {
      linkPeople: '18502178364'
    };
  },
  components: {
    common,
    'select-item': selectItem,
  },
  methods: {
    comEvent() {
      console.log('this fathers components')
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/css/common.scss';
.B{
  .select-item{
    border: 1px solid black;
    box-sizing: border-box;
  }
}
</style>