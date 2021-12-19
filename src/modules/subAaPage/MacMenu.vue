<template>
    <div class="MacMenuContainer" @mousemove.stop="handleHover" @mouseout.stop="handleOut">
        <div class="content">
            <div class="MenuItem" v-for="item in 12" :key="item" @click="handleClick(item)">
                <div class="ItemContent">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import throttle from 'lodash/throttle';

// eslint-disable-next-line
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
            // moveFn(e)
            this.move(e)
        },
        move(e) {
            const { x } = e;
            const container = document.querySelector('.content')
            const children = [].slice.call(container.children)
            children.forEach((item) => {
                const { width, x: itemX } = item.getBoundingClientRect();
                const itemCenterXPola = itemX + width / 2;
                const diff = Math.abs(x - itemCenterXPola);
                if (diff < 200) {
                    let rate = 1 + (200 - diff) / 200 * 0.5;
                    rate = rate.toFixed(3);
                    item.style = `transform: scale(${rate});`;
                }
            })
        },
        handleOut() {
            const container = document.querySelector('.content')
            const children = [].slice.call(container.children)
            children.forEach((item) => {
                item.style = 'transform: scale(1)'
            })
        },
        handleClick(item) {
            console.log(item)
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
    position: relative;
    $itemWidth: 50px;
    &::before{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: #575656;
        opacity: 0.6;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 20px;
    }
    .content{
        display: flex;
        z-index: 2;
    }
    .MenuItem{
        width: $itemWidth;
        height: $itemWidth;
        line-height: $itemWidth;
        text-align: center;
        margin: 0 12px;
        background: greenyellow;
        border-radius: 10px;
        transform-origin: bottom center;
        transform: scale(1);
    }
    .ItemContent{
        width: $itemWidth;
        height: $itemWidth;
    }
}
</style>
