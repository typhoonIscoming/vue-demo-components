<template>
    <div class="pageG">
        <iframe
            src="http://192.168.1.203:9552/imageLib?origin=outer"
            width="100%"
            height="100%"
            frameborder="0"
        />
    </div>
</template>

<script>
export default {
    name: 'PageG',
}
</script>

<style lang="scss" scoped>
.pageG{
    height: 100%;
    padding-top: 40px;
}
</style>
