<template>
    <div class="UserAttribute">
        <div class="Header">
            <span class="collapsedBtn" @click="isCollapsed = !isCollapsed">
                <i :class="isCollapsed ? 'el-icon-plus' : 'el-icon-minus'"></i>
            </span>
            <span class="title">用户属性满足</span>
            <div class="actions">
                <el-button type="text" @click="handleAdd">添加</el-button>
            </div>
        </div>
        <div class="rulesContainer" :class="{ hide: isCollapsed }">
            <Relation :value="config.relation" type="connect" @click="handleChangeRelation('parent')">
                <template v-for="(item, index) in config.children">
                    <div :key="index">
                        <template v-if="item.children && item.children.length > 0">
                            <div class="hasChild">
                                <Relation :value="item.relation" type="connect" @click="handleChangeRelation('child', index)">
                                    <div v-for="(oItem, i) in item.children" :key="i" class="AttributeRow">
                                        <div class="AttributeContent">
                                            <AttributeRule :config.sync="item.children[i]" />
                                        </div>
                                        <div class="ruleActions">
                                            <el-button
                                                v-if="i === item.children.length - 1"
                                                type="text"
                                                icon="el-icon-circle-plus-outline"
                                                @click="handleAddChild('child', index)">
                                                新增
                                            </el-button>
                                            <el-button type="text" icon="el-icon-circle-close" @click="handleDelete('child', index, i)" />
                                        </div>
                                    </div>
                                </Relation>
                            </div>
                        </template>
                        <template v-else>
                            <div class="hasNotChild">
                                <div class="AttributeRow">
                                    <div class="AttributeContent">
                                        <AttributeRule :config.sync="config.children[index]" />
                                    </div>
                                    <div class="ruleActions">
                                        <el-button
                                            type="text"
                                            icon="el-icon-circle-plus-outline"
                                            @click="handleAddChild('parent', index)">
                                            新增
                                        </el-button>
                                        <el-button type="text" icon="el-icon-circle-close" @click="handleDelete('parent', index)" />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </Relation>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import AttributeRule from './attribute/rule';
import RelationMixin from './relationMixins';
import { initUserAttributeConfig } from './configFactory';

export default {
    name: 'UserAttribute',
    mixins: [RelationMixin],
    components: {
        Relation, AttributeRule,
    },
    methods: {
        initConfig() {
            // 配置给mixin中使用
            return { ...initUserAttributeConfig() }
        },
    },
    created() {
        console.log('attr', this.config)
    },
}
</script>
<style lang='scss' scoped>
@import './userRuleCommon.scss';
</style>
