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
                <Relation :value="config.relation" @click="handleChangeRelation('parent', oIndex)">
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
                <!--频率类型-->
                <el-cascader
                    v-model="config.frequency"
                    :options="frequencyList"
                    class="width160"
                    @change="handleChangeFrequency"
                />
                <template v-if="frequencyType === '2'">
                    <span>天数</span>
                </template>
                <!--符号 = > < ≠ TOPN 区间 值-->
                <el-select
                    v-model="config.mark"
                    placeholder="请选择"
                    class="width80"
                    @change="handleChangeMark"
                >
                    <el-option
                        v-for="item in showOperatorList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                </el-select>
                <template v-if="config.mark === 8">
                    <!--前值符号-->
                    <el-select
                        v-model="config.times.frontValueMark"
                        placeholder="请选择"
                        class="width80"
                        @change="handleChangeOperator"
                    >
                        <el-option
                            v-for="item in valuePositionOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" />
                    </el-select>
                </template>
                <!--前值-->
                <el-input-number
                    v-model="config.times.frontValue"
                    :min="numberMinValue"
                    controls-position="right"
                    class="width120"
                />
                <template v-if="config.mark === 8 || config.mark === 7">
                    <span>至</span>
                    <!--后值-->
                    <el-input-number
                        v-model="config.times.endValue"
                        :min="numberMinValue"
                        controls-position="right"
                        class="width120"
                    />
                </template>
                <template v-if="config.mark === 8">
                    <!--后值符号-->
                    <el-select
                        v-model="config.times.endValueMark"
                        placeholder="请选择"
                        class="width100"
                    >
                        <el-option
                            v-for="item in endValueOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" />
                    </el-select>
                </template>
                <template v-if="(frequencyType === '1' || frequencyType === '2') && config.mark !== 8">
                    <span>{{ frequencyType === '1' ? '次' : '天' }} </span>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import DictionaryMixin from '../dictionaryMixins';
import BaseRule from './rule';
import RelationMixin from '../relationMixins';
import { initUserAttributeConfig, initTimesRangeValue } from '../configFactory';

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
            // numberMinValue: -Infinity,
        }
    },
    computed: {
        frequencyList() { // 最后显示的频率类型列表
            const event = this.config.event;
            // 选择当前事件中被允许的频率的下拉列表
            const currentItem = this.somethingOptions.find(item => item.value === event);
            if (currentItem) {
                const allowFrequency = currentItem.frequencyList;
                // 过滤被允许的列表
                return this.frequencyConditionOptions.filter(item => allowFrequency.includes(item.value))
            }
            return []
        },
        frequencyType() {
            // 当前用户选择的频率类型
            // 将数组转换成字符串判断
            return this.config.frequency.join('-')
        },
        showOperatorList() {
            // 当选择了是频率类型是“分布”,就不显示符号列表的“TOP N”
            if (this.frequencyType === '2') {
                return this.operatorOptions.filter(item => item.value !== 8)
            }
            return this.operatorOptions
        },
        numberMinValue() {
            const type = this.frequencyType;
            // 第一层级的判断
            if (type === '1' || type === '2') {
                // 如果选择总次数或分布
                return 1;
            }
            let val = -Infinity
            if (this.config.times.frontValueMark === 8) {
                // 如果是选择了TOPN，那么最小值也是1
                val = 1
            }
            return val
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
        handleChangeFrequency() {
            // 选择频率类型是分布 且 之前已经选择了TOP N，那么就需要重置数据
            if (this.frequencyType === '2' && this.config.mark === 8) {
                this.config.mark = 1;
                const val = this.config.times.frontValue;
                this.config.times = {
                    ...initTimesRangeValue(1),
                    frontValue: val >= 1 ? val : 1, // 将已经有的前值保存起来
                }
            }
        },
        handleChangeOperator() {
            console.log('numberMinValue', this.numberMinValue)
        },
        handleChangeMark() {
            const val = this.config.times.frontValue;
            this.config.times = {
                ...initTimesRangeValue(this.config.mark),
                frontValue: val >= 1 ? val : 1, // 将已经有的前值保存起来
            }
        },
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
