<template>
    <div class="CascaderItem">
        CascaderItem
    </div>
</template>

<script>
export default {
    name: 'CascaderItem',
    props: {
        options: {
            type: Array,
            default: () => [],
        },
    },
}
</script>
<style lang='scss' scoped>
.CascaderItem{
    display: inline-block;
    width: 200px;
}
</style>
