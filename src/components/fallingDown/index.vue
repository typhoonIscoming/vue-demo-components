<template>
    <div
        :style="{
            left: `${left}px`,
            'animation-delay': `${delay}s`,
        }"
        class="FallingBall"
    />
</template>

<script>
/* eslint-disable */
export default {
    name: 'FallingBall',
    props: {
        left: Number,
        delay: Number,
    },
}
</script>

<style lang="scss" scoped>
@for $i from 1 through 30 {
    .FallingBall:nth-child(#{$i}){
        background-color: hsla(random(360), 100%, 50%, 1);
    }
}
.FallingBall{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: fixed;
    z-index: 999;
    animation: movetobottom 5s infinite linear;
    top: -30px;
}
@keyframes movetobottom{
    0%{ top: -30px; }
    100%{ top: 100vh; }
}
</style>
