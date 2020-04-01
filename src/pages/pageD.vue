<template>
    <div class="D common page-d-container">
        <common title="d"></common>
        <div class="content">
            <xh-scroll-index>
            </xh-scroll-index>
        </div>
        <div class="bottom">D页面</div>
    </div>
</template>

<script>
import common from "@/components/common";
import scrollIndex from '@/components/scrollIndex';

export default {
    data() {
        return {
            list: [
                
            ],
        };
    },
    components: {
        common,
        'xh-scroll-index': scrollIndex,
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.page-d-container{
    #container{
        width: 100%;
        height: 100%;
    }
}
</style>