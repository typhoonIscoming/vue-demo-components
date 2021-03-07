<template>
    <div class="container common f-page">
        <xh-common title="f" />
        <!-- <pdf :src="src" /> -->
        <div class="content">

        </div>
    </div>
</template>


<script>
import common from '@/components/common';
import pdf from 'vue-pdf'

export default {
    data() {
        return {
            currentPage: 0,
            pageCount: 0,
            src: '',
        }
    },
    components: {
        'xh-common': common,
        pdf,
    },
    created() {
        // const src = `https://ecard-test.95505.cn:8082/upload/20200525/2fbc872ac4cc4e42b383aa95c3fa679c.pdf?v=${+new Date()}`
        // this.src = pdf.createLoadingTask(src)
        // this.regRgba()
        // this.regRgb()
        // this.regHex()
        // this.regHsl()
        // this.regHsla()
        const result = this.rgbaToHex('rgba(20,30,40)')
        console.log('result=', result)
    },
    methods: {
        rgbaToHex(rgba) {
            if (!rgba) return '#000000';
            rgba = rgba.replace(/\s/g, '')
            const hex = unit => Number(unit).toString(16).padStart(2, '0')
            console.log('===', hex('255'))
            const rgbaArr = rgba.match(/(\d+),(\d+),(\d+)/); // rgba
            console.log('rgbaArr', rgbaArr)
            // const rgbArr = rgba.match(/(\d+),(\d+),(\d+)/); // rgb
            // if (!rgbaArr && !rgbArr) return '#000000';

            // const tempArray = rgbaArr || rgbArr;
            // const temp = tempArray.slice(1, 4);
            // const value = temp.map(item => hex(item))
            // const result = `#${value.join('')}`
            return rgba
        },
        regRgba() {
            const rgbareg = new RegExp(/^[rR][gG][Bb][Aa][\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){3}[\s]*(1|1.0|(0?(\d|(\.[1-9]{1,2}))))[\)]{1}$/);
            const isRgba = rgba => rgbareg.test(rgba)
            console.log('isRgba', isRgba('rgba(10,20,30,0.5)'))
        },
        regRgb() {
            const rgbreg = new RegExp(/^[rR][gG][Bb][\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\s]*,){2}[\s]*(2[0-4]\d|25[0-5]|[01]?\d\d?)[\s]*[\)]{1}$/);
            const isRgb = rgb => rgbreg.test(rgb)
            console.log('isRgb', isRgb('rgb(10,20,30)'))
        },
        regHex() {
            const hexreg = new RegExp(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/);
            const isHex = hex => hexreg.test(hex)
            console.log('isHex', isHex('#102030'))
        },
        regHsl() {
            const hslreg = new RegExp(/^[hH][Ss][Ll][\(]([\s]*(2[0-9][0-9]|360|3[0-5][0-9]|[01]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*)[\)]$/);
            const isHsl = hsl => hslreg.test(hsl)
            console.log('isHsl', isHsl('hsl(360,20%,30%)'))
        },
        regHsla() {
            // eslint-disable-next-line
            const hslareg = new RegExp(/^[hH][Ss][Ll][Aa][\(]([\s]*(2[0-9][0-9]|360|3[0-5][0-9]|[01]?[0-9][0-9]?)[\s]*,)([\s]*((100|[0-9][0-9]?)%|0)[\s]*,){2}([\s]*(1|1.0|0|0?\.[0-9]{1,2})[\s]*)[\)]$/);
            const isHsla = hsla => hslareg.test(hsla)
            console.log('isHsla', isHsla('hsla(360,20%,30%,0.5)'))
        },
    },
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";
.f-page{
    background-color: #07c160;
    .content{
        background: white;
    }
}
</style>
