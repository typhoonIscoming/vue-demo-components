<template>
    <div class="StickyDemo" ref="container">
        <div class="container" style="height:200px;" ></div>
            <Sticky :container="container" :scroll="scroll" :offset-top="40">
                <div class="StickyItem">
                    StickyItem{{ 1 }}
                </div>
            </Sticky>
        <!-- </div> -->
        <div style="height:500px;background-color:yellow;"></div>
    </div>
</template>

<script>
// import Vue from 'vue';
import Sticky from '@/components/sticky/main';

// console.log('Sticky', Sticky)

export default {
    name: 'Main',
    data() {
        return {
            container: null,
            scroll: null,
        }
    },
    components: {
        Sticky,
    },
    mounted() {
        setTimeout(() => {
            this.container = this.$refs.container;
            this.scroll = document.querySelector('.stickyBox')
        }, 200)
    },
}
</script>
<style lang='scss' scoped>
.StickyDemo{
    display: inline-block;
    width: 100%;
    height: 200px;
    // border: 1px solid black;
    position: relative;
    overflow-y: auto;
    .StickyBoxItem{
        height: 600px;
        &~.StickyBoxItem{
            margin-top: 20px;
        }
    }
    .container{
        background-color: greenyellow;
    }
    .StickyItem{
        width: 50%;
        height: 50px;
        background-color: red;
        display: inline-block;
    }
}
</style>
<style lang="scss">
.van-sticky--fixed{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
}
</style>
