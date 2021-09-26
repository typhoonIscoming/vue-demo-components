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
                @success="handleVerifySuccess"
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
    mounted() {
        this.uuid()
    },
    methods: {
        uuid() {
            /* eslint-disable */
            const s = []
            const hexDigits = '0123456789abcdef'
            for (let i = 0; i < 36; i += 1) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
            }
            s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-'

            const slider = 'slider' + '-' + s.join('')
            const point = 'point' + '-' + s.join('')
            // 判断下是否存在 slider
            console.log(localStorage.getItem('slider'))
            if (!localStorage.getItem('slider')) {
                localStorage.setItem('slider', slider)
            }
            if (!localStorage.getItem('point')) {
                localStorage.setItem('point', point)
            }
            /* eslint-enable */
        },
        handleVerifySuccess(distance) {
            this.dialogVisible = false;
            console.log('distance', distance)
        },
    },
}
</script>
<style lang='scss' scoped>
</style>
