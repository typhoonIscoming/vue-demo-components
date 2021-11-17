<template>
    <div class="RelationItem">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'RelationItem',
    data() {
        return {}
    },
}
</script>
<style lang='scss' scoped>
.RelationItem{
    min-height: 50px;
    line-height: 50px;
    border: 1px solid black;
    &:last-child{
        margin-bottom: 0;
    }
}
</style>
