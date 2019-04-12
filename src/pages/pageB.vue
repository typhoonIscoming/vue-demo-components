<template>
    <div class="B common">
        <common title="b"></common>
        <div class="content">
          <a :href="'sms:' + linkPeople">{{ $t('m.sendSMS') }}</a>
        </div>
        <div class="bottom">
            b页面
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
export default {
  data() {
    return {
      linkPeople: '18502178364'
    };
  },
  components: {
    common
  }
};
</script>

<style lang='scss' scoped>
@import '@/css/common.scss';
</style>