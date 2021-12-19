<template>
    <div class="MacMenuContainer" @mousemove.stop="handleHover">
        <div class="content">
            <div class="MenuItem" v-for="item in 8" :key="item">
                {{ item }}
            </div>
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
            const { x } = e;
            const container = document.querySelector('.content')
            const children = [].slice.call(container.children)
            children.forEach((item) => {
                const { width, x: itemX } = item.getBoundingClientRect();
                const itemCenterXPola = itemX + width / 2;
                const diff = Math.abs(x - itemCenterXPola);
                console.log('itemCenterXPola', diff)
            })
        },
    },
}
</script>
<style lang='scss' scoped>
.MacMenuContainer{
    display: inline-block;
    margin: 50px auto 0;
    position: relative;
    cursor: pointer;
    padding: 10px;
    background: #F3D7D1;
    border-radius: 20px;
    .content{
        display: flex;
    }
    .MenuItem{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 0 13px;
        transition: all .2s linear;
        background: greenyellow;
        border-radius: 10px;
        transform-origin: bottom center;
        &:hover{
            transform: scale(1.5);
        }
    }
}
</style>
