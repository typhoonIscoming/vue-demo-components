<template>
    <div class="OrderRule">
        <div class="flex-row">
            <div>
                <el-date-picker
                    v-model="config.date.value"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                />
                <span>依次做过</span>
            </div>
            <div class="RowAction flex-row">
                <el-button type="text" icon="el-icon-close" @click="handleDeleteRow"></el-button>
            </div>
        </div>
        <template v-for="(item, index) in config.children">
            <div :key="index" class="OrderRuleItem">
                <div class="flex-row">
                    <el-select
                        v-model="item.event"
                        placeholder="请选择"
                        class="width160"
                        @change="handleChangeCondition(index)"
                    >
                        <el-option
                            v-for="item in conditionOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="text" icon="el-icon-plus" @click="handleAddFilter(index)">添加筛选</el-button>
                    <div class="ChildRowAction flex-row">
                        <el-button v-if="config.children.length > 2" type="text" icon="el-icon-circle-close" @click="handleDelete('parent', index)" />
                    </div>
                </div>
                <div v-if="item.children && item.children.length" class="OrderChildContainer flex-row">
                    <span class="description">并且满足</span>
                    <div class="RuleContent">
                        <Relation :value="item.relation" @click="handleChangeRelation('child', index)">
                            <template v-for="(oItem, i) in item.children">
                                <div :key="i">
                                    <div style="display:inline-block;">
                                        <BaseRule :config.sync="item.children[i]" />
                                    </div>
                                    <el-button type="text" icon="el-icon-circle-close" @click="handleCurrentDelete(index, i)"></el-button>
                                </div>
                            </template>
                        </Relation>
                    </div>
                </div>
            </div>
        </template>
        <div class="actionsContainer">
            <el-button type="text" icon="el-icon-plus" @click="handleAdd">添加事件</el-button>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import DictionaryMixin from '../dictionaryMixins';
import BaseRule from './rule';
import RelationMixin from '../relationMixins';
import { initUserAttributeConfig, initOrderConfig } from '../configFactory';

export default {
    name: 'OrderRule',
    mixins: [DictionaryMixin, RelationMixin],
    computed: {
        bindValue: {
            get() {
                return this.config;
            },
            set(config) {
                this.$emit('update:config', config);
            },
        },
    },
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        },
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        },
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        },
                    },
                ],
            },
        };
    },
    components: {
        Relation, BaseRule,
    },
    created() {
        console.log('rule', this.config);
    },
    methods: {
        handleChangeCondition(index) {
            this.config.children = this.config.children.map((item, i) => {
                if (i === index) {
                    return { ...item, children: [] }
                }
                return item
            })
        },
        handleAddFilter(index) {
            this.config.children = this.config.children.map((item, i) => {
                if (i === index) {
                    return { ...item, children: [...item.children, { ...initUserAttributeConfig() }] }
                }
                return item
            })
        },
        handleCurrentDelete(parentIndex, childIndex) {
            this.config.children = this.config.children.map((item, i) => {
                if (i === parentIndex) {
                    item.children.splice(childIndex, 1)
                }
                return item
            })
        },
        handleDeleteRow() {
            this.$emit('onDelete')
        },
        initConfig() {
            // 配置给mixin中使用
            return { ...initOrderConfig() }
        },
    },
};
</script>
<style lang="scss" scoped>
.OrderRule{
    .OrderRuleItem{
        margin-top: 12px;
    }
    .OrderChildContainer{
        margin-top: 8px;
        .description{
            width: 100px;
            height: 32px;
            line-height: 32px;
            margin-top: 2px;
            text-align: right;
            align-self: flex-start;
            color: #5e6d82;
            font-size: 13px;
            padding-right: 8px;
        }
        .RuleContent{
            border-left: 2px solid #6fd2b2;
            padding-left: 18px;
            flex: 1;
        }
    }
    .ChildRowAction, .RowAction{
        flex: 1;
        justify-content: flex-end;
    }
}
</style>
