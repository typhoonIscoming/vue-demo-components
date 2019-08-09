<template>
    <div class="rotate-container"
        @click="getPosition">
        <div class="rotate-box">
            <div class="rotate-center" />
            <div class="content" ref="content">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    :class="'item_' + index"
                    class="item"
                >
                    {{ item.id }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Rotate',
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    created() {
        this.itemStyle()
    },
    methods: {
        itemStyle() {
            const num = this.list.length;
            console.log(num)
            this.$nextTick(() => {
                const { x, y, width, height } = this.$refs.content.getBoundingClientRect()
                console.log('x, y', x, y, this.$refs.content.getBoundingClientRect())
            })
        },
        getPosition(e) {
            console.log(e)
        },
    },
}
</script>
<style lang="scss" scoped>
.absolute_pointer{
    position: absolute;
    border-radius: 50%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
@keyframes rotate {
    0%{ -webkit-transform: perspective(500px) rotateX(-45deg) rotateY(-30deg)  rotateZ(360deg); }
    25%{ -webkit-transform: perspective(500px) rotateX(-45deg) rotateY(-30deg) rotateZ(270deg); }
    50%{ -webkit-transform: perspective(500px) rotateX(-45deg) rotateY(-30deg) rotateZ(180deg); }
    75%{ -webkit-transform: perspective(500px) rotateX(-45deg) rotateY(-30deg) rotateZ(90deg); }
    100%{ -webkit-transform: perspective(500px) rotateX(-45deg) rotateY(-30deg) rotateZ(0deg); }
}
.rotate-container{
    position: relative;
    width: 100%;
    height: 100%;
    .rotate-box{
        width: 200px;
        height: 200px;
        border: 1px solid red;
        @extend .absolute_pointer;
        transform-style: preserve-3d;
        transform: perspective(500px) rotateY(0deg) rotateZ(0deg);
        // animation: rotate 3s linear infinite;
        .rotate-center{
            width: 50px;
            height: 50px;
            border: 1px solid black;
            @extend .absolute_pointer;
            // background: url('~@/assets/logo.png')no-repeat center center;
            background-size: contain;
        }
        .content{
            @extend .absolute_pointer;
            .item{
                position: absolute;
                width: 30px;
                height: 30px;
                border: 1px solid blue;
                border-radius: 50%;
            }
        }
    }
}
</style>
