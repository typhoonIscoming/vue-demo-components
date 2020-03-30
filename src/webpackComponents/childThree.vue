<template>
    <div>
        this is child three
        <p>传入的参数{{ text }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    created() {},
    mounted() {},
}
</script>
<style lang='scss' scoped>
</style>