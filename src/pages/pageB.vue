<template>
    <div class="B common">
        <common title="b"></common>
        <div class="content" />
        <div class="bottom">
            b页面
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
export default {
  data() {
    return {};
  },
  components: {
    common
  }
};
</script>

<style lang='scss' scoped>
@import '@/css/common.scss';
</style>