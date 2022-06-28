<template>
    <div class="Semicircle">
        <div class="middle"></div>
        <div class="inner"></div>
    </div>
</template>

<script>
export default {
    name: 'Semicircle',
}
</script>

<style lang="scss" scoped>
.Semicircle{
    width: 200px;
    height: 100px;
    display: inline-block;
    position: relative;
    border-radius: 100px 100px 0 0;
    background-color: red;
    .middle, .inner{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    .middle{
        width: 80px;
        height: 40px;
        border-radius: 40px 40px 0 0;
        background-color: greenyellow;
    }
    .inner{
        width: 50px;
        height: 25px;
        border-radius: 25px 25px 0 0;
        background-color: aqua;
    }
}
</style>
