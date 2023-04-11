<template>
    <div class="pageG">
        <!-- <div style="height:300px;background-color:#fff;"></div> -->
        <!-- <div class="stickyBox" style="height:300px;overflow:auto;border:1px solid black;"> -->
            <StickyDemo />
            <!-- <div style="height:300px"></div> -->
        <!-- </div> -->
        <!-- <Sticky>
            <div class="vantStickyItem" >vantItem</div>
        </Sticky> -->
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
import { Sticky } from 'vant';
import StickyDemo from './pageG/sticky';


export default {
    name: 'PageG',
    components: {
        StickyDemo, Sticky,
    },
}
</script>

<style lang="scss" scoped>
.pageG{
    height: 100%;
    overflow-y: auto;
    padding-top: 40px;
    .vantStickyItem{
        height: 200px;
        background-color: greenyellow;
    }
}
</style>
