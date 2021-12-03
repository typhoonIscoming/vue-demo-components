<template>
    <div class="ActionRule">
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
                <el-select
                    v-model="config.isDone"
                    placeholder="请选择"
                    class="width160"
                    @change="handleChangeCondition"
                >
                    <el-option
                        v-for="item in hasDoneList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="RowAction flex-row">
                <el-button type="text" icon="el-icon-close" @click="handleDeleteRow"></el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Relation from '@/components/Relation';
import DictionaryMixin from '../dictionaryMixins';
// import BaseRule from './rule';
import RelationMixin from '../relationMixins';
import { initActionConfig } from '../configFactory';

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
    components: {
        Relation,
    },
    methods: {
        handleChangeCondition() {

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
.ActionRule{
    .ChildRowAction, .RowAction{
        flex: 1;
        justify-content: flex-end;
    }
}
</style>
