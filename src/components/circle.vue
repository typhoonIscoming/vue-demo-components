<template>
    <div class="circle-container">
        <svg viewBox="0 0 250 50">
            <path d="M 0,50 a 50, 50 0 1, 1 0, 1 z" id="tseCircle" />
            <text>
                <textPath xlink:href="#tseCircle">
                    this is circle text
                </textPath>
            </text>
        </svg>
    </div>
</template>

<script>

export default {
    name: 'TseCircle',
}
</script>
<style lang='scss' scoped>
.circle-container{
    height: 100px;
    path{
        fill: none;
    }
    svg{
        display: block;
        overflow: visible;
    }
}
</style>
