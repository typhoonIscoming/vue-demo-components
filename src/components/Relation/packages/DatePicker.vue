<template>
    <div class="DatePickerComponent">
        <el-input slot="reference" v-model="input" readonly prefix="el-icon-date" placeholder="请输入内容" @focus="handleFocus" />
        <div class="DataPikerContent">
            <el-date-picker
                ref="dataPicker"
                v-model="value2"
                v-show="false"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                size="mini"
                :unlink-panels="true"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="left"
                class="DefindPicker"
            >
            </el-date-picker>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HuaDatePicker',
    components: {
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
            value2: '',
            input: '',
            show: false,
        }
    },
    mounted() {
    },
    methods: {
        handleFocus() {
            console.log('focus', this.$refs.dataPicker.$el)
            if (this.$refs.dataPicker.$el) {
                this.$refs.dataPicker.$el.click()
            }
        },
        clickDay() {},
        changeDate() {},
    },
}
</script>
<style lang='scss' scoped>
.DataPikerContent{
    width: 800px;
}
.DefindPicker{
    position: fixed;
    top: 30%;
    left: 70%;
    z-index: -1;
}
</style>
