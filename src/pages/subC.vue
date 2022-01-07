<template>
    <div class="sub-c-page common">
        <div class="RelationDemoBox">
            <Relation :value="relation" type="connect" @click="handleClick">
                <UserAttribute :config="userAttributeConfig" />
                <UserAction :config="userActionConfig" />
                <UserOrder :config="userOrderConfig" />
            </Relation>
        </div>
        <el-button @click="handleVerify">验证</el-button>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import UserAttribute from '../components/Relation/userAttribute';
import UserAction from '../components/Relation/userAction';
import UserOrder from '../components/Relation/userOrder';
import { initUserAttributeConfig, initActionConfig, initOrderConfig } from '../components/Relation/configFactory';

const getType = str => Object.prototype.toString.call(str).slice(8, -1);
const trimStr = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');
const isNotEmpty = (val) => {
    const type = getType(val);
    if (type === 'String') {
        return !!trimStr(val)
    } else if (type === 'Number') {
        return true
    } else if (type === 'Null' || type === 'undefined') {
        return false
    }
    return true
}

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
                    { relation: 1, children: [{ ...initUserAttributeConfig() }] },
                ],
            },
            userActionConfig: {
                relation: 1,
                children: [
                    { ...initActionConfig() },
                ],
            },
            userOrderConfig: {
                relation: 1,
                children: [{ ...initOrderConfig(), ...initOrderConfig() }],
            },
        }
    },
    methods: {
        handleClick() {
            this.relation = +(!this.relation)
        },
        handleVerify() {
            const newList = this.removeEmpty(
                this.userAttributeConfig.children,
                item => item.children,
            )
            const actionList = this.removeEmpty(
                this.userActionConfig.children,
                item => item.children || item.filterCondition,
            )
            console.log('actionList', actionList)
            this.userAttributeConfig = { ...this.userAttributeConfig, children: newList }
            console.log('userAttributeConfig', this.userAttributeConfig)
        },
        removeEmpty(children) {
            const recursion = (list) => {
                for (let i = 0; i < list.length;) {
                    const item = list[i];
                    if (item.children && item.children.length) {
                        recursion(item.children)
                    } else {
                        const type = getType(item.value);
                        if (
                            type === 'Array'
                            && (item.value.length === 0 || item.value.find(val => !isNotEmpty(val)))
                        ) {
                            list.splice(i, 1)
                            i -= 1;
                        }
                    }
                    i += 1
                }
                return list
            }
            const tempList = recursion(children);
            // 去除空children
            const clearEmpty = (list) => {
                for (let i = 0; i < list.length;) {
                    const item = list[i];
                    if (item.children && item.children.length) {
                        clearEmpty(item.children)
                    } else if (item.children && item.children.length === 0) {
                        // 清除这个item
                        list.splice(i, 1)
                        i -= 1
                    }
                    i += 1
                }
                return list
            }
            const newList = clearEmpty(tempList)
            return newList
        },
    },
}
</script>

<style scoped lang="scss">
@import '@/css/common.scss';

.sub-c-page{
    height: 100%;
    overflow-y: scroll;
    .RelationDemoBox{
        width: 960px;
        margin: 0 auto;
        padding: 20px 0;
    }
}
</style>
