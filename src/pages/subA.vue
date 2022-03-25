<template>
    <div class="sub-a-container common" @mousemove="handleContainerMouseMove">
        <p>x轴坐标：{{ clientX }}， Y轴坐标：{{ clientY }}</p>
        <div class="box">
            <ul class="container">
                <li
                    ref="containerItem"
                    v-for="item in list"
                    :key="item.id"
                    class="item"
                    @mousedown="handleMouseDown"
                >
                    {{ item.content }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { debounce } from '@/utils/debounce';

const elementFactory = (len = 15) => {
    const arr = [];
    for (let i = 0; i < len; i += 1) {
        arr.push({ id: i, content: (Math.random().toString().substr(3) * 1).toString(36) })
    }
    return arr
}
export default {
    name: 'SubPageA',
    data() {
        return {
            list: [...elementFactory()],
            clientX: null,
            clientY: null,
        }
    },
    mounted() {
        this.$refs.containerItem.forEach((item) => {
            item.style.top = `${item.offsetTop}px`
            item.style.left = `${item.offsetLeft}px`
            item.style.margin = '0 5px 5px 0';
        })
        this.$refs.containerItem.forEach((item) => {
            item.style.position = 'absolute'
        })
        this.sort()
    },
    methods: {
        sort() {
            const data = [
                { label: 'a成都', count: 2695 },
                { label: '绵阳', count: 2693 },
                { label: '南充', count: 2697 },
                { label: '德阳', count: 2698 },
                { label: '内江', count: 2692 },
                { label: '自贡', count: 2694 },
            ];
            const sortAscllCode = (list) => {
                list.sort((a, b) => a.label.charCodeAt(0) - b.label.charCodeAt(0))
                return list
            }
            console.log('sortAscllCode', sortAscllCode(data))
        },
        handleMouseDown(event) {
            const target = event.target;
            const disX = event.clientX - target.offsetLeft;
            const disY = event.clientY - target.offsetTop;
            console.log('===', disX, disY)
            event.target.style.zIndex = 2
            document.onmousemove = (evt) => {
                console.log('onmousemove', evt)
                return false
            }
            document.onmouseup = (evt) => {
                console.warn('mouseup', evt)
                document.removeEventListener('onmousemove', () => {
                    console.log('success')
                })
            }
            return false
        },
        handleMouseMove(e) {
            const target = e.target
            const maxL = target.parentNode.clientWidth - target.offsetWidth;
            const maxT = target.parentNode.clientHeight - target.offsetHeight
            console.log('maxL', maxL, maxT)
        },
        handleMouseUp(event) {
            console.log('mouseup', event)
        },
        handleContainerMouseMove: debounce(function move(event) {
            const { clientX, clientY } = event;
            this.clientX = clientX
            this.clientY = clientY
        }, 100),
    },
}
</script>
<style lang='scss' scoped>
@import "~@/css/common.scss";

@mixin randomColor() {
    $r: random(255);
    $g: random(255);
    $b: random(255);
    background-color: rgba($r, $g, $b, random(1));
    // color: rgba(random(255), random(255), random(255), random(1));
}


@for $i from 1 through 20 {
    .item:nth-child(#{$i}) {
        @include randomColor();
    }
}

.sub-a-container{
    height: 100%;
    .box{
        padding: 20px;
        border: 1px solid black;
    }
    .container{
        list-style: none;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        position: relative;
        .item{
            float:left;
            text-align: center;
            width:80px;
            height:80px;
            line-height: 80px;
            overflow:hidden;
            border: 1px solid #999;
            margin: 0 5px 5px 0;
            word-break: break-all;
            box-sizing: border-box;
            cursor: move;
            user-select: none;
            color: white;
            font-size: 14px;
            &.butt{
                overflow:hidden;
                border:2px dashed blue;
                box-sizing: border-box;
            }
        }
    }
}
</style>
