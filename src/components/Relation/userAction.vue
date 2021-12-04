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
                    <div :key="index" class="RuleRow">
                        <!--第三级规则如果是chidlren-->
                        <template v-if="item.children && item.children.length">
                            <Relation :value="item.relation" @click="handleChangeNextLevel(index)">
                                <template v-for="(oItem, i) in item.children">
                                    <div :key="i" class="ChildRule flex-row">
                                        <div class="RuleContent">
                                            <ActionRule :config.sync="item.children[i]" :oIndex="i" />
                                        </div>
                                        <div class="actionContent flex-row">
                                            <div style="display:inline-block">
                                                <el-button
                                                    v-if="i === item.children.length - 1"
                                                    type="text"
                                                    icon="el-icon-circle-plus-outline"
                                                    @click="handleAddChild('child', index)">
                                                    新增
                                                </el-button>
                                                <el-button
                                                    type="text"
                                                    icon="el-icon-close"
                                                    @click="handleDelete('child', index, i)" />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </Relation>
                        </template>
                        <!--第三级就是条件-->
                        <template v-else>
                            <div class="ChildRule flex-row">
                                <div class="RuleContent">
                                    <ActionRule :config.sync="config.children[index]" :oIndex="index" />
                                </div>
                                <div class="actionContent flex-row">
                                    <div style="display:inline-block">
                                        <el-button
                                            type="text"
                                            icon="el-icon-circle-plus-outline"
                                            @click="handleAddChild('parent', index)">
                                            新增
                                        </el-button>
                                        <el-button
                                            type="text"
                                            icon="el-icon-close"
                                            @click="handleDelete('parent', index)"></el-button>
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
            console.log('index', index)
        },
        handleDeleteRow() {},
        initConfig() {
            // 配置给mixin中使用
            return { ...initActionConfig() }
        },
    },
}
</script>
<style lang='scss' scoped>
@import './userRuleCommon.scss';

.userAction{
    .RelationItemContainer{
        &:not(:last-child){
            .ActionRule{
                margin-bottom: 20px;
            }
        }
    }
    .ChildRule{
        width: 100%;
    }
    .RuleContent{
        flex: 1;
    }
    .actionContent{
        width: 120px;
        justify-content: flex-end;
    }
}
</style>
