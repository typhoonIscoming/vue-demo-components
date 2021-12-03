<template>
    <div class="sub-c-page common">
        <div class="RelationDemoBox">
            <Relation :value="relation" type="connect" @click="handleClick">
                <UserAttribute :config="userAttributeConfig" />
                <UserAction :config="userActionConfig" />
                <UserOrder :config="userOrderConfig">child relation</UserOrder>
            </Relation>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import UserAttribute from '../components/Relation/userAttribute';
import UserAction from '../components/Relation/userAction';
import UserOrder from '../components/Relation/userOrder';
import { initUserAttributeConfig, initOrderConfig } from '../components/Relation/configFactory';

export default {
    name: 'SubCpage',
    components: {
        Relation, UserAttribute, UserAction, UserOrder,
    },
    data() {
        return {
            relation: 1,
            userAttributeConfig: {
                relation: 1,
                children: [
                    { relation: 1, children: [{ ...initUserAttributeConfig() }, { ...initUserAttributeConfig() }] },
                    { ...initUserAttributeConfig() },
                    { ...initUserAttributeConfig() },
                ],
            },
            userActionConfig: {
                relation: 1,
                children: [],
            },
            userOrderConfig: {
                relation: 1,
                children: [{ ...initOrderConfig() }],
            },
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
