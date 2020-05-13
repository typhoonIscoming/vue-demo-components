<template>
    <div class="container common f-page">
        <xh-common title="f" />
    </div>
</template>


<script>
import common from "@/components/common";
export default {
    data() {
        return {

        }
    },
    components: {
        'xh-common': common,
    }
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";
.f-page{
    background-color: #07c160;
}
</style>