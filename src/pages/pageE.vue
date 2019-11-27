<template>
    <div class="page-e">
        <div class="draggable-menu">
            <div
                v-for="item in 10"
                :key="item"
                :draggable="true"
                class="draggable-item"
                :data-component-id="item"
            >
                {{ item }}
            </div>
        </div>
        <div class="draggable-container">
            <vue-draggable-resizable
                :w="200"
                :h="200"
                :parent="true"
                @dragging="onDrag"
                @resizing="onResize"
            >
                <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
                X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
            </vue-draggable-resizable>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pageE',
    data() {
        return {
            x: 0,
            y: 0,
            width: 200,
            height: 200,
        }
    },
    methods: {
        onDrag(x, y) {
            this.x = x;
            this.y = y
            // console.log(x, y)
        },
        onResize(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width
            this.height = height
            // console.log(x, y, width, height)
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
            cursor: pointer;
            &+.draggable-item{
                margin-top: 10px;
            }
        }
    }
    .draggable-container{
        height: 100%;
        flex: 1;
        border: 1px solid red;
        position: relative;
    }
}
</style>
