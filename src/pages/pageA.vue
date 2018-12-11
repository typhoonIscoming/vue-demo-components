<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
        </div>
        <div class="bottom">
            bottom
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
    common,
  },
  created() {
    let a = 9, b = 5;
    a = a ^ b;
    b = b ^ a;
    a = a ^ b;
    console.log('a', a, 'b', b)
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';

</style>