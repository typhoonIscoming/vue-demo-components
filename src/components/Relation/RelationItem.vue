<template>
    <div class="RelationItem">
        <DatePicker />
        <slot />
    </div>
</template>

<script>
import DatePicker from './packages/DatePicker';

export default {
    name: 'RelationItem',
    components: {
        DatePicker,
    },
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
