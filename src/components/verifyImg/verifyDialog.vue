<template>
    <el-dialog
        title="提示"
        append-to-body
        :visible.sync="dialogVisible"
        width="fit-content"
    >
        <div class="DialogContent">
            <Verify
                :defaultImg="defaultImg"
            />
        </div>
    </el-dialog>
</template>

<script>
import defaultImg from '@/assets/images/default.jpg';
import Verify from './verify';

export default {
    name: 'VerifyDialog',
    data() {
        return {
            defaultImg,
            isMobile: false,
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Verify,
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
