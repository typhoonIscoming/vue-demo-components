<template>
    <div class="sub-c-page common">
        <div class="RelationDemoBox">
            <Relation :value="relation" type="connect" @click="handleClick">
                <RelationItem>child relation</RelationItem>
                <RelationItem>child relation</RelationItem>
                <RelationItem>child relation</RelationItem>
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
            rules: [],
            relation: 1,
        }
    },
    methods: {
        handleClick() {
            this.relation = +(!this.relation)
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
