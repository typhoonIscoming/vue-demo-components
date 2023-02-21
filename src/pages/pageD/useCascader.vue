<template>
    <div class="Container">
        <Cascader />
    </div>
</template>

<script>
import Cascader from '@/components/cascader';

console.log('Cascader', Cascader);

export default {
    name: 'Main',
    components: {
        Cascader,
    },
}
</script>
<style lang='scss' scoped>
.Container{
}
</style>
