<template>
    <div class="UserAttribute userAction">
        <div class="Header">
            <span class="collapsedBtn" @click="isCollapsed = !isCollapsed">
                <i :class="isCollapsed ? 'el-icon-plus' : 'el-icon-minus'"></i>
            </span>
            <span class="title">用户行为满足</span>
            <div class="actions">
                <el-button type="text" @click="handleAdd">添加</el-button>
            </div>
        </div>
        <div class="rulesContainer" :class="{ hide: isCollapsed }">
            <Relation :value="config.relation" @click="handleChangeRelation('parent')">
                <template v-for="(item, index) in config.children">
                    <div :key="index">
                        <template v-if="item.children && item.children.length">
                            <Relation :value="item.relation" @click="handleChangeNextLevel(index)">
                                <template v-for="(oItem, i) in item.children">
                                    <div :key="i">
                                        <ActionRule :config.sync="config.children[index]" :oIndex="i" />
                                    </div>
                                </template>
                            </Relation>
                        </template>
                        <template v-else>
                            <ActionRule :config.sync="config.children[index]" :oIndex="index" />
                        </template>
                    </div>
                </template>
            </Relation>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import ActionRule from './attribute/actionRule';
import RelationMixin from './relationMixins';
import { initActionConfig } from './configFactory';

export default {
    name: 'UserAttribute',
    mixins: [RelationMixin],
    components: {
        Relation, ActionRule,
    },
    methods: {
        handleChangeNextLevel(index) {
            // 修改配置中的第二级的关系
        },
        initConfig() {
            // 配置给mixin中使用
            return { ...initActionConfig() }
        },
    },
}
</script>
<style lang='scss' scoped>
@import './userRuleCommon.scss';
</style>
