<template>
    <el-dialog
        title="提示"
        append-to-body
        :visible.sync="dialogVisible"
        width="80%"
    >
        <div class="DialogContent">
            :before-close="handleClose"
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'VerifyDialog',
    data() {
        return {}
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        dialogVisible: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
}
</script>
<style lang='scss' scoped>
</style>
