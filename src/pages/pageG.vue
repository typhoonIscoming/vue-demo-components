<template>
    <div class="pageG">
        <StickyDemo />
        <!-- <div class="blank" style="height:1000px"></div> -->
        <!-- <iframe
            src="https://ad.huaat.com/node-marketing/marketing/breakthroughQuestion/index.html#/home?activityCode=1594966040712843265&token=0158fa6ca3de4919bfe67f18a7120e6c"
            width="100%"
            height="100%"
            frameborder="0"
        /> -->
    </div>
</template>

<script>
import StickyDemo from './pageG/sticky';

export default {
    name: 'PageG',
    components: {
        StickyDemo,
    },
}
</script>

<style lang="scss" scoped>
.pageG{
    // height: 100%;
    padding-top: 40px;
}
</style>
