<template>
    <div class="container common f-page">
        <xh-common title="f" />
        <!-- <pdf :src="src" /> -->
        <div class="content">
            <!-- <div class="example-container">
                <audio
                    src="https://oss.oact.net/BgMusic/0-1645774162380006527.mp3"
                    id="MusicPlay"
                    class="media-audio"
                    loop
                    autoplay
                    preload
                    controls
                    ref="MusicPlay"
                ></audio>
            </div> -->
            <div class="row flex-row">
                <Sketch :value="color" />
                <Chrome :value="color" />
                <!-- <Input v-model="mobile" rules="isMobile|required" /> -->
                <!-- <Semicircle /> -->
                <div class="verifyContainer">
                    <DragVerifyImgChip
                        ref="verifyImgChip"
                        :isPassing.sync="isPassing"
                        :imgsrc="verifyImg"
                        :showRefresh="true"
                        :diffWidth="4"
                        text="请按住滑块拖动"
                        successText="验证通过"
                        refreshIcon="el-icon-refresh-refresh"
                        handlerIcon="el-icon-d-arrow-right"
                        successIcon="el-icon-circle-check"
                        @passcallback="pass"
                        @refresh="reimg"
                    />
                    <div>
                        <span
                            class="refreshBtn"
                            @click="handleRefresh"
                        >
                            还原
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import common from '@/components/common';
import pdf from 'vue-pdf';
import { Sketch, Chrome } from 'vue-color';
import Input from '@/components/Input';
import Semicircle from '@/components/Semicircle';
import DragVerifyImgChip from '@/components/verify/verifyClip';
import verifyImg from '@/assets/images/default.jpg';

let timer = null;

export default {
    data() {
        return {
            currentPage: 0,
            pageCount: 0,
            src: '',
            list: [{ name: 1 }, { name: 2 }],
            color: '',
            mobile: '',
            verifyImg,
            isPassing: false,
        }
    },
    components: {
        'xh-common': common,
        pdf,
        Sketch,
        Chrome,
        Input,
        Semicircle,
        DragVerifyImgChip,
    },
    created() {
        // const src = 'http://47.108.206.236:60035/loanapp/sign_contract/税金贷-个人征信授权_1618231562836.pdf'
        // this.src = pdf.createLoadingTask(src)
        // this.regRgba()
        // this.regRgb()
        // this.regHex()
        // this.regHsl()
        // this.regHsla()
        // const result = this.rgbaToHex('rgba(20,30,40)')
        // console.log('result=', result)
    },
    mounted() {
        window.addEventListener('devicemotion', (e) => {
            this.deviceMotionEvent(e)
        })
        // window.navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        const supportsVibrate = 'vibrate' in navigator;
        const connection = navigator.connection; // 网络连接状态
        console.log('supportsVibrate', supportsVibrate, connection)
        if (supportsVibrate) {
            timer = setInterval(() => {
                // this.shake()
            }, 3000)
        }
        // this.playAudio();
    },
    beforeDestroy() {
        if (timer) {
            clearInterval(timer);
        }
    },
    methods: {
        pass(status) {
            console.log('status', status)
        },
        reimg() {},
        handleRefresh() {
            this.$refs.verifyImgChip.reset()
        },
        playAudio() {
            const audio = document.querySelector('#MusicPlay');
            document.body.click()
            audio.oncanplay = () => {
                console.log('===')
                audio.play()
            }
            document.addEventListener('WeixinJSBridgeReady', () => {
                audio.load();
                audio.play();
            }, false);
        },
        deviceMotionEvent(e) {
            console.log('e', e)
        },
        shake() {
            console.log('shake')
            // 让手机震动
            window.navigator.vibrate(2000) // 震动2s
            // 震动出莫尔斯电码的"SOS"效果
            window.navigator.vibrate([
                100, 30, 100, 30, 100, 200, 200, 30, 200, 30, 200, 200, 100, 30, 100, 30, 100,
            ]);
            const t = setTimeout(() => {
                window.navigator.vibrate(0);
                clearTimeout(t)
            }, 2000)
        },
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
            return isHsla('hsla(360,20%,30%,0.5)')
        },
    },
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";
.f-page{
    // background-color: #07c160;
    .content{
        background: white;
    }
    .example-container{
        height: 400px;
    }
    .example-one{
        float: left;
        clear: both;
        height: 200px;
    }
    .example-second{
        // float: right;
        clear: both;
        height: 200px;
        line-height: 400px;
    }
    .rightBox{
        float: right;
        height: 100%;
    }
    .verifyContainer{
        padding: 10px 50px;
        background-color: rgba(0,0,0,0.7);
    }
    .refreshBtn{
        padding: 6px 12px;
        background-color: #409eff;
        color: white;
        font-size: 14px;
        border-radius: 4px;
    }
}
</style>
