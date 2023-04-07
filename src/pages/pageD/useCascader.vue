<template>
    <div class="Container">
        <Cascader :options="cities" />
    </div>
</template>

<script>
import Cascader from '@/components/cascader';
import api from '@/api';

export default {
    name: 'Main',
    components: {
        Cascader,
    },
    data() {
        return {
            cities: [],
        }
    },
    created() {
        api.getAddress().then((res) => {
            console.log('res', res)
            if (res.data) {
                this.cities = res.data || [];
            }
        })
    },
}
</script>
<style lang='scss' scoped>
.Container{
    display: block;
}
</style>
