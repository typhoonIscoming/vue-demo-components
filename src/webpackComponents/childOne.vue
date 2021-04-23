<template>
    <div>
        template 的缺陷：一值多用、代码冗余
        如：在页面中要通过某一个状态判断需要显示哪一个元素，就需要v-if  v-else-if v-else 就造成代码冗余
        这就是在Vue3中render函数的意义
        用render 和 template创建的元素的区别：render是生成的真是的dom,免去的转译的过程， template是创建的虚拟DOM
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        item: Object,
    },
    created() {},
    mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
