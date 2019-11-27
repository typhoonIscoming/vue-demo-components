<template>
    <div class="es6-let-page">
        {{ content }}
    </div>
</template>
<script>
export default {
    name: 'EsLet',
    props: {
        content: {
            type: String,
            default: '',
        },
    },
}
</script>
<style lang="scss" scoped>

</style>
