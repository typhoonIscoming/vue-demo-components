<template>
    <div class="UserAttribute UserOrder">
        <div class="Header">
            <span class="collapsedBtn" @click="isCollapsed = !isCollapsed">
                <i :class="isCollapsed ? 'el-icon-plus' : 'el-icon-minus'"></i>
            </span>
            <span class="title">行为序列</span>
            <div class="actions">
                <el-button type="text" @click="handleCurrentAdd">添加</el-button>
            </div>
        </div>
        <div class="rulesContainer" :class="{ hide: isCollapsed }">
            <Relation :value="config.relation" @click="handleChangeRelation('parent')">
                <div
                    v-for="(item, index) in config.children"
                    :key="index"
                >
                    <OrderRule :config.sync="config.children[index]" @onDelete="handleDeleteRow(index)" />
                </div>
            </Relation>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import OrderRule from './attribute/orderRule';
import RelationMixin from './relationMixins';
import { initOrderConfig } from './configFactory';

export default {
    name: 'UserAttribute',
    mixins: [RelationMixin],
    components: {
        Relation, OrderRule,
    },
    methods: {
        initConfig() {
            // 配置给mixin中使用
            return { ...initOrderConfig() }
        },
        handleCurrentAdd() {
            // 调用mixin中的添加方法
            this.handleAdd();
        },
        handleDeleteRow(index) {
            this.handleDelete('parent', index)
        },
    },
}
</script>
<style lang='scss' scoped>
@import './userRuleCommon.scss';
</style>
