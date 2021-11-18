<template>
    <div class="DatePickerComponent">
        <el-input slot="reference" v-model="input" readonly prefix="el-icon-date" placeholder="请输入内容" @focus="handleFocus" />
        <div class="DataPikerContent">
            <el-date-picker
                ref="dataPicker"
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
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
        // this.$refs.dataPicker.focus()
    },
    methods: {
        handleFocus() {
            console.log('focus')
            this.show = true
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
</style>
