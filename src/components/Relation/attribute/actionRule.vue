<template>
    <div class="ActionRule">
        <div class="flex-row">
            <div>
                <!--日期-->
                <el-date-picker
                    v-model="config.date.value"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                />
                <!--是否做过某事-->
                <el-select
                    v-model="config.isDone"
                    placeholder="请选择"
                    class="width80"
                    @change="handleChangeCondition"
                >
                    <el-option
                        v-for="item in hasDoneList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <!--这里变动之后，会影响时间频率的下拉选择-->
                <el-select
                    v-model="config.event"
                    placeholder="请选择"
                    class="width160"
                    @change="handleChangeThing"
                >
                    <el-option
                        v-for="item in somethingOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                </el-select>
                <el-button type="text" icon="el-icon-plus" @click="handleAddChildCondition">添加筛选</el-button>
            </div>
        </div>
        <div
            v-if="config.filterCondition && config.filterCondition.length"
            class="childConditionContainer flex-row"
        >
            <span class="description">并且满足</span>
            <div class="RuleContent">
                <Relation :value="config.relation" @click="handleChangeRelation('child', oIndex)">
                    <template v-for="(oItem, i) in config.filterCondition">
                        <div :key="i">
                            <div style="display:inline-block;">
                                <BaseRule :config.sync="config.filterCondition[i]" />
                            </div>
                            <el-button type="text" icon="el-icon-circle-close" @click="handleCurrentDelete(i)"></el-button>
                        </div>
                    </template>
                </Relation>
            </div>
        </div>
        <template v-if="config.isDone === 'done'">
            <div class="frequency">
                <el-cascader
                    v-model="config.frequency"
                    :options="frequencyList"
                    class="width160"
                    @change="handleChangeFrequency"
                />
            </div>
        </template>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import DictionaryMixin from '../dictionaryMixins';
import BaseRule from './rule';
import RelationMixin from '../relationMixins';
import { initUserAttributeConfig } from '../configFactory';

export default {
    name: 'ActionRule',
    mixins: [DictionaryMixin, RelationMixin],
    props: {
        oIndex: {
            type: Number,
            default: 0,
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
        }
    },
    computed: {
        frequencyList() {
            const event = this.config.event;
            const currentItem = this.somethingOptions.find(item => item.value === event);
            if (currentItem) {
                const allowFrequency = currentItem.frequencyList;
                return this.frequencyConditionOptions.filter(item => allowFrequency.includes(item.value))
            }
            return []
        },
    },
    components: {
        Relation, BaseRule,
    },
    methods: {
        handleChangeCondition() {

        },
        handleChangeThing() {
            // 重置数据
            this.$set(this.config, 'frequency', [1])
        },
        handleChangeFrequency() {},
        handleAddChildCondition() {
            this.config.filterCondition = this.config.filterCondition.concat([{ ...initUserAttributeConfig() }])
        },
        handleCurrentDelete(index) {
            // 删除筛选条件的row
            this.config.filterCondition.splice(index, 1)
        },
    },
}
</script>
<style lang='scss' scoped>
.ActionRule{
    .ChildRowAction, .RowAction{
        flex: 1;
        justify-content: flex-end;
    }
    .frequency{
        margin-top: 12px;
    }
    .childConditionContainer{
        margin-top: 10px;
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
}
</style>
