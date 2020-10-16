<template>
    <div>
        权限问题：当一个用户没有对应的权限，无法点击一个button时，那么可能会用v-show去隐藏这个按钮，但是如果用户打开了页面控制台
        找到了这个按钮，导致显示了这个按钮，如果你的后台逻辑不够严谨，那么就会导致很严重的问题。
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {},
};
</script>
<style lang='scss' scoped>
</style>
