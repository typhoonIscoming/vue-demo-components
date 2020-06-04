<template>
    <div class="container common f-page">
        <xh-common title="f" />
        <pdf
			src="https://ecard-test.95505.cn:8082/upload/20200525/2fbc872ac4cc4e42b383aa95c3fa679c.pdf"
			@num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
		></pdf>
    </div>
</template>


<script>
import common from "@/components/common";
import pdf from 'vue-pdf'

export default {
    data() {
        return {
            currentPage: 0,
			pageCount: 0,
        }
    },
    components: {
        'xh-common': common,
        pdf,
    }
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";
.f-page{
    background-color: #07c160;
}
</style>