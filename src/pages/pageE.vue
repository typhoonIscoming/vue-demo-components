<template>
    <div class="page-e common">
        <div style="height: 100%; width: 100%; border: 1px solid red; position: relative;">
            <vue-draggable-resizable
                :w="100"
                :h="100"
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
            width: 0,
            height: 0,
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
</style>
