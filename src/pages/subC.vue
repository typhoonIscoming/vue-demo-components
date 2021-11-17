<template>
    <div class="sub-c-page common">
        <div class="RelationDemoBox">
            <Relation>
                <RelationItem />
            </Relation>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import RelationItem from '@/components/Relation/RelationItem';

export default {
    name: 'SubCpage',
    components: {
        Relation, RelationItem,
    },
    data() {
        return {
        }
    },
    methods: {
        handleOnload() {
        },
    },
}
</script>

<style scoped lang="scss">
@import '@/css/common.scss';

.sub-c-page{
    height: 100%;
    .RelationDemoBox{
        width: 800px;
        margin: 0 auto;
    }
}
</style>
