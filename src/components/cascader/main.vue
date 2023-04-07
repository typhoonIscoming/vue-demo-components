<template>
    <div class="cascader">
        <CascaderPanel
            :options="options"
        />
    </div>
</template>

<script>
import CascaderPanel from './cascaderPanel';

export default {
    name: 'CasCaderMain',
    components: {
        CascaderPanel,
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedIndex: 0,
        }
    },
    created() {
        console.log('options', this.options)
    },
}
</script>
<style lang='scss' scoped>
.cascader{
    display: inline-block;
}
</style>
