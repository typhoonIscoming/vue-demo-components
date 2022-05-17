<template>
    <div class="AttributeRuleContainer">
        <el-form ref="ruleForm" :model="bindingConfig" :rules="rules">
            <el-form-item prop="condition">
                <el-select
                    v-model="bindingConfig.condition"
                    placeholder="请选择"
                    class="width160"
                    @change="handleChangeCondition"
                >
                    <el-option
                        v-for="item in conditionOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="mark">
                <el-select
                    v-model="bindingConfig.mark"
                    placeholder="请选择"
                    class="width160"
                    @change="handleChangeMark"
                >
                    <el-option
                        v-for="item in operationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <template v-if="showLastInputerType === 'select'">
                <el-form-item prop="value">
                    <el-select v-model="bindingConfig.value" multiple allow-create placeholder="请选择" class="width160">
                        <el-option
                            v-for="item in valueOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-else-if="showLastInputerType === 'input'">
                <el-form-item prop="value">
                    <el-input v-model="bindingConfig.value" placeholder="请输入内容" class="Inputer width160" />
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import DictionaryMixin from '../dictionaryMixins';
import { initUserAttributeConfig } from '../configFactory';

export default {
    name: 'AttributeRule',
    props: {
        config: {
            type: Object,
            default: () => {},
        },
        rules: {
            type: Object,
            default: () => {},
        },
    },
    mixins: [DictionaryMixin],
    computed: {
        bindingConfig: {
            get() {
                return this.config
            },
            set(config) {
                this.$emit('update:config', config)
            },
        },
        showLastInputerType() {
            // 显示最后一个值的组件类型
            const mark = this.config.mark;
            const current = this.operationOptions.find(item => item.value === mark);
            if (current) {
                return current.mark
            }
            return 'none'
        },
    },
    methods: {
        handleChangeCondition() {
            this.bindingConfig = { ...initUserAttributeConfig(this.config.condition) }
        },
        handleChangeMark() {
            const { condition, mark } = this.config;
            let tempValue = '';
            if (this.showLastInputerType === 'select') {
                tempValue = []
            }
            this.bindingConfig = {
                ...initUserAttributeConfig(condition, mark, tempValue),
            }
        },
    },
}
</script>
<style lang='scss' scoped>
.AttributeRuleContainer{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-basis: content;
    .el-select {
        &:not(:first-child){
            margin-left: 4px;
        }
    }
    &:not(:last-child){
        /deep/.el-select{
            margin-bottom: 10px;
        }
    }
    .Inputer{
        display: inline-block;
        margin-left: 4px;
    }
    .el-form{
        width: 100%;
        .el-form-item{
            display: inline-block;
            margin: 0;
        }
    }
}
</style>
