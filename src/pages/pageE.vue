<template>
    <div class="page-e">
        <div class="draggable-menu">
            <div
                v-for="(item, index) in menuType"
                :key="index"
                :draggable="true"
                :data-component-type="item.type"
                class="draggable-item"
                @dragstart="dragstart"
            >
                {{ item.name }}
            </div>
        </div>
        <div
            class="draggable-container"
            @dragover="dragover"
            @drop="drop"
        >
            <template
                v-for="(item, index) in getComponents"
            >
                <vue-draggable-resizable
                    :key="index"
                    :w="item.width"
                    :h="item.height"
                    :x="0"
                    :y="0"
                    :parent="true"
                    :contenteditable="false"
                    :enable-native-drag="false"
                    :disable-user-select="true"
                    :prevent-deactivation="false"
                    :lock-aspect-ratio="false"
                    :axis="'both'"
                    @dragging="onDrag"
                    @resizestop="onResize"
                    @activated="activatedComponent(item)"
                    @deactivated="deactivatedComponent(item)"
                    class="drag-item"
                    :style="`transform: translate(${item.x}px, ${item.y}px);`"
                >
                    <es-let-component
                        v-if="item.componentType === 'let'"
                        :content="menuType[index].content"
                        :style="{'transform': `translate(${item.x}px, ${item.y}px);`}"
                    />
                    <div v-if="item.componentType === 'const'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'destructuring'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'string'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'number'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'object'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'array'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'set'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'map'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'proxy'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'reflect'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'promise'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'generator'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'async'">
                        {{ item.content }}
                    </div>
                    <div v-if="item.componentType === 'class'">
                        {{ item.content }}
                    </div>
                    <v-chart
                        v-if="item.componentType === 'VChart'"
                        :data="vChartData"
                        class="redefine-v-chart-style"
                    >
                        <v-scale x :tick-count="3" />
                        <v-tooltip :show-item-marker="false" show-x-value />
                        <v-line />
                    </v-chart>
                    <v-chart
                        v-if="item.componentType === 'VPie'"
                        prevent-render
                        @on-render="renderChart"
                        class="redefine-v-chart-style"
                    >
                    </v-chart>
                </vue-draggable-resizable>
            </template>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import dragComponents from '@/components/drag/dragComponents';
import { debounce } from '@/utils/debounce';

export default {
    name: 'pageE',
    data() {
        return {
            menuType: [
                { type: 'let', name: 'ES6-let', content: 'let语法' },
                { type: 'const', name: 'ES6-const', content: 'const语法' },
                { type: 'destructuring', name: 'ES6-destructuring', content: 'Destructuring语法' },
                { type: 'string', name: 'ES6-string', content: 'string扩展' },
                { type: 'reg', name: 'ES6-reg', content: 'reg语法' },
                { type: 'number', name: 'ES6-number', content: 'number语法' },
                { type: 'object', name: 'ES6-object', content: 'object语法' },
                { type: 'array', name: 'ES6-array', content: 'array语法' },
                { type: 'set', name: 'ES6-set', content: 'set语法' },
                { type: 'map', name: 'ES6-map', content: 'map语法' },
                { type: 'proxy', name: 'ES6-proxy', content: 'proxy语法' },
                { type: 'reflect', name: 'ES6-reflect', content: 'reflect语法' },
                { type: 'promise', name: 'ES6-promise', content: 'promise语法' },
                { type: 'generator', name: 'ES6-generator', content: 'generator语法' },
                { type: 'async', name: 'ES6-async', content: 'async语法' },
                { type: 'class', name: 'ES6-class', content: 'class语法' },
                { type: 'VChart', name: 'vux-VChart', content: 'VChart' },
                { type: 'VPie', name: 'vux-VPie', content: 'VPie' },
            ],
            vChartData: [
                { date: '2017-06-05', value: 116 },
                { date: '2017-06-06', value: 129 },
                { date: '2017-06-07', value: 135 },
                { date: '2017-06-08', value: 86 },
                { date: '2017-06-09', value: 73 },
                { date: '2017-06-10', value: 85 },
                { date: '2017-06-11', value: 73 },
            ],
        }
    },
    components: {
        ...dragComponents,
    },
    computed: {
        ...mapGetters('drag', ['getComponents', 'getCurrentDragType']),
    },
    methods: {
        ...mapActions('drag', ['addComponent', 'deleteComponent', 'setActivitedComponent',
            'setDeactivitedComponent', 'setCurrentDragElementType', 'setCurrentComponentSize',
            'setCurrentComponentLocation']),
        onDrag(x, y) {
            this.setCurrentComponentLocation({ x, y })
        },
        onResize(left, top, width, height) {
            const params = {
                width, height,
            }
            const changeSize = debounce(this.changeSize, 500)
            changeSize(params)
        },
        changeSize(data) {
            this.setCurrentComponentSize(data)
        },
        dragstart(e) {
            const { target } = e
            this.setCurrentDragElementType(target.dataset.componentType)
        },
        dragover(e) {
            e.preventDefault()
        },
        drop(e) {
            // 当鼠标拖动着元素进入框中，当鼠标进入容器的时候触发此事件，如果鼠标移出了容器，也不会触发这个事件
            // x, y 就是鼠标在容器中，距离左上为原点的位置
            const { offsetX, offsetY } = e;
            console.log(e)
            this.addComponent({
                componentType: this.getCurrentDragType,
                x: offsetX,
                y: offsetY,
            })
        },
        // 当前被激活的组件
        activatedComponent(item) {
            this.setActivitedComponent(item.componentId)
        },
        // 激活的组件市区焦点
        deactivatedComponent(item) {
            this.setDeactivitedComponent()
        },
        renderChart({ chart }) {
            const data = [ { x: '1', y: 85 } ]
            chart.source(data, {
                y: {
                max: 100,
                min: 0
                }
            })
            chart.axis(false)
            chart.tooltip(false)
            chart.coord('polar', {
                transposed: true,
                innerRadius: 0.8,
                radius: 0.85
            })
            chart.guide().arc({
                start: [ 0, 0 ],
                end: [ 1, 99.98 ],
                top: false,
                style: {
                lineWidth: 20,
                stroke: '#ccc'
                }
            })
            chart.guide().text({
                position: [ '50%', '50%' ],
                content: '85%',
                style: {
                fontSize: 24,
                fill: '#1890FF'
                }
            })
            chart.interval()
                .position('x*y')
                .size(20)
                .animate({
                appear: {
                    duration: 1200,
                    easing: 'cubicIn'
                }
                })
            chart.render()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "@/css/common.scss";
.page-e{
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    .draggable-menu{
        width: 200px;
        height: 100%;
        margin-right: 10px;
        padding: 0 10px;
        .draggable-item{
            height: 30px;
            border: 1px solid black;
            box-sizing: border-box;
            text-align: center;
            line-height: 30px;
            cursor: move;
            &+.draggable-item{
                margin-top: 10px;
            }
        }
    }
    .draggable-container{
        height: 100%;
        // flex: 1;
        width: 50%;
        border: 1px solid red;
        position: relative;
        box-sizing: border-box;
        transform-origin: 0 0;
        transform: scale(0.7);
        .drag-item{
            left: 0 !important;
            top: 0 !important;
            will-change: transform;
        }
    }
}
</style>
<style lang="scss">
.page-e{
    .redefine-v-chart-style{
        width: 100% !important;
        height: 100% !important;
        &>canvas{
            width: 100% !important;
            height: 100% !important;
        }
    }
}
</style>
