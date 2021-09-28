<template>
    <div class="MacMenuContainer" @mousemove.stop="handleHover">
        <div class="MenuItem" v-for="item in 8" :key="item">
            {{ item }}
        </div>
    </div>
</template>

<script>
import throttle from 'lodash/throttle';

let moveFn = null;

export default {
    name: 'MacMenu',
    data() {
        return {}
    },
    created() {
        moveFn = throttle(this.move, 300)
    },
    methods: {
        handleHover(e) {
            moveFn(e)
        },
        move(e) {
            const { x, y } = e;
            const container = document.querySelector('.MacMenuContainer')
            // const children = e.target;
            const children = [].slice.call(container.children)
            children.forEach((item) => {
                console.log('item', item.offsetLeft)
            })
            console.log('e', x, y, children)
        },
    },
}
</script>
<style lang='scss' scoped>
.MacMenuContainer{
    display: inline-block;
    margin: 50px auto 0;
    position: relative;
    .MenuItem{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        float: left;
        margin: 0 13px;
        transition: all .2s linear;
        background: greenyellow;
        border-radius: 100%;
        &:hover{
            transform-origin: bottom center;
            transform: scale(1.5);
        }
    }
}
</style>
