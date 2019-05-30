<template>
    <div class="selected-container">
        <div class="child-components-a" @click.stop="eventA">事件A</div>
        <div class="child-components-b" @click.stop="eventB">事件B</div>
    </div>
</template>
<script>
export default {
    name: 'Selected',
    data() {
        return {

        }
    },
    methods: {
        eventA() {
            console.log('defined event a')
        },
        eventB() {
            console.log('defined event b')
        },
    },
}
</script>
<style lang="scss" scoped>
.selected-container{
    width: 100%;
    height: 100px;
}
</style>
