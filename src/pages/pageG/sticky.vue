<template>
    <div class="StickyDemo">
        <!-- <div v-for="item in 3" :key="item" class="StickyBoxItem"> -->
            <div ref="container" class="container">
                <Sticky :container="container" :offset-top="20">
                    <div class="StickyItem">
                        StickyItem{{ 1 }}
                    </div>
                </Sticky>
            </div>
        <!-- </div> -->
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
        }
    },
    components: {
        Sticky,
    },
    mounted() {
        this.container = this.$refs.container;
    },
}
</script>
<style lang='scss' scoped>
.StickyDemo{
    display: inline-block;
    width: 100%;
    // height: 1300px;
    border: 1px solid black;
    position: relative;
    overflow-y: auto;
    .StickyBoxItem{
        height: 600px;
        background-color: greenyellow;
        &~.StickyBoxItem{
            margin-top: 20px;
        }
    }
    .container{
        height: 200px;
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
