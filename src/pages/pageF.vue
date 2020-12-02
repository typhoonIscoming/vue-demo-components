<template>
    <div class="container common f-page">
        <xh-common title="f" />
        <!-- <pdf :src="src" /> -->
        <div class="content">

        </div>
    </div>
</template>


<script>
import common from '@/components/common';
import pdf from 'vue-pdf'

export default {
    data() {
        return {
            currentPage: 0,
            pageCount: 0,
            src: '',
        }
    },
    components: {
        'xh-common': common,
        pdf,
    },
    created() {
        const src = `https://ecard-test.95505.cn:8082/upload/20200525/2fbc872ac4cc4e42b383aa95c3fa679c.pdf?v=${+new Date()}`
        this.src = pdf.createLoadingTask(src)
    },
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";
.f-page{
    background-color: #07c160;
    .content{
        background: white;
    }
}
</style>
