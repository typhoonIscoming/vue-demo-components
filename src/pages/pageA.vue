<template>
    <div class="A page-a common">
        <common title="a"></common>
        <div class="content">
            <template v-for="item in ballList">
                <FallingBall
                    :key="item.key"
                    :left="item.left"
                    :delay="item.delay"
                />
            </template>
            <button @click="isExpand = !isExpand">展开</button>
            <xh-transition
                class="define"
                time="10"
            >
                <div v-show="isExpand" class="expend">
                    <div class="changeable-container">我的高度可以改变</div>
                </div>
            </xh-transition>
            <center>weufihwfhiowjfoi</center>
            <cus-ruler
                :maxScale="50"
                :minScale="0"
                :startValue="startValue"
                @rulervalue="rulervalue"
                class="rulevalue">
            </cus-ruler>
            <div>
                <el-button @click="manageCamera">打开/关闭摄像头</el-button>
            </div>
            <!-- <div class="live-container">
                <div class="camera-container-box">
                    <cus-camera
                        :is-open="isOpenCamera"
                        @takePicture="takePicture"
                    />
                </div>
                <div class="snapshot-container">
                    <div
                        v-for="(item, index) in imagesList"
                        :key="index"
                        class="picture-container">
                        <img :src="item.src" />
                    </div>
                </div>
            </div> -->
            <div class="flex-row">
                <div class="left">
                    <p v-for="(value, key) in getAllAttribute" :key="key">
                        <span >{{ key }} = {{ value }}</span>
                    </p>
                    <p @click="operator">
                        <span v-for="(item, index) in arrayList" :key="index">{{ item }}</span>
                    </p>
                    <p @click="changeStorage">chnage localstorage's value</p>
                </div>
                <div class="middle">
                    <svg-icon class-name="download-icon" icon-class="download" />
                    <p @click="$router.push('/subA')">跳转subA</p>
                    <p @click="$router.push('/subAa')">跳转subAa</p>
                    <p @click="$router.push('/draggable')">跳转draggable</p>
                    <p @click="changeLanguage">切换语言</p>
                </div>
                <div class="right">
                    <p>测试enterkeyhint属性</p>
                    <p lang="en-GB">This paragraph is defined as British English. tabindex定义tab键聚焦顺序</p>
                    <progress value="70" max="100">70 %</progress>
                    <input enterkeyhint="go" value="go tabindex=0" tabindex="0">
                    <input enterkeyhint="enter" value="enter tabindex=3" tabindex="3">
                    <input enterkeyhint="done" value="done tabindex=5" tabindex="5">
                    <input enterkeyhint="next" value="next tabindex=2" tabindex="2">
                    <input enterkeyhint="previous" value="previous tabindex=1" tabindex="1">
                    <input enterkeyhint="search" value="search tabindex=6" tabindex="6">
                    <input enterkeyhint="send" value="send tabindex=4" tabindex="4">
                    <span class="tag">教育局</span>
                </div>
            </div>
        </div>
        <div class="bottom" @click="selectEvent">{{ $t('m.bottom') }}</div>
    </div>
</template>

<script>
import common from '@/components/common';

// import { debounce } from "@/utils/debounce";
import { debounce } from 'lodash'
// import axios from 'axios'
import XhTransition from '@/components/transition/transition'
import ruler from '@/components/rule';
import camera from '@/components/camera';
// import { getUrlPrams } from '@/utils/hashString';
import { curry } from '@/utils/tool';
import { generateUUID as uuid } from '@/utils/getUUId'
import FallingBall from '@/components/fallingDown';

export default {
    data() {
        return {
            list: [
                { id: 1, relation: '子女', mobile: '13558513096' },
                { id: 2, relation: '子女', mobile: '13558513095' },
            ],
            showList: true,
            selected: [],
            index: 0,
            showTimes: 0,
            timer: null,
            isExpand: false,
            startValue: 0,
            isOpenCamera: false,
            imagesList: [],
            getAllAttribute: {
                name: 'pudong',
                address: 'shanghai',
            },
            arrayList: [1, 2, 3],
            ballList: [],
        };
    },
    components: {
        common,
        [XhTransition.name]: XhTransition,
        'cus-ruler': ruler,
        'cus-camera': camera,
        FallingBall,
    },
    created() {
        // let a = 9,
        //     b = 5;
        // a ^= b;
        // b ^= a;
        // a ^= b;
        const a = '123'
        console.log(a.padStart(4, '$'))

        const fn = (aa, bb, cc) => aa + bb + cc;
        const curryFn = curry(fn);
        const result = curryFn(1, 2)(3);
        console.log('result', result)
    },
    mounted() {
        // document.addEventListener("visibilitychange", this.linsteningEvent);
        // const getparams = getUrlPrams('a')
        // console.log('getparams', getparams)
        window.addEventListener('storage', (e) => {
            console.log('e', e)
        });
        const random = (val, suffix = 0) => Number((Math.random() * (val || 100)).toFixed(suffix));
        const wid = window.innerWidth - 30;
        const arr = [];
        for (let i = 0; i < 10; i += 1) {
            arr.push({ key: uuid(), left: random(wid), delay: random(10) })
        }
        this.ballList = arr;
        console.log(this.ballList)
    },
    methods: {
        changeStorage() {
            const value = (Math.random().toString().substr(3) * 1).toString(36)
            console.log('value', value)
            const params = { random: value }
            localStorage.setItem('root', JSON.stringify(params))
        },
        rulervalue(value) {
            this.rulerValue = value
        },
        operator() {
            this.arrayList = this.operator.reverse()
        },
        titleTips() {
            this.timer = setTimeout(() => {
                if (document.title === '_') {
                    document.title = '消息';
                } else document.title = '_';
                this.titleTips();
            }, 500);
        },
        selectEvent() {
            this.showList = true;
        },
        linsteningEvent() {
            if (document.hidden) {
                // 处于当前页面
                console.log('页面被切换了');
                this.titleTips();
            } else {
                clearTimeout(this.timer);
            }
        },
        test() {
            this.index += 1;
            this.showTimesDebounce();
        },
        showTimesDebounce: debounce(
            function name(data) {
                this.showTimes += 1;
                console.log('data', data)
            },
            1000,
            true,
        ),
        changeLanguage: debounce(function name() {
            const lang = this.$i18n.locale;
            if (lang === 'en') {
                this.$i18n.locale = 'zh-CN';
            } else if (lang === 'zh-CN') {
                this.$i18n.locale = 'en';
            }
        }),
        showConfirm() {
            this.$vux.confirm.show({
                title: this.$t('m.title'),
                content: this.$t('m.content'),
                confirmText: this.$t('m.confirm'),
                cancelText: this.$t('m.cancel'),
                onConfirm: () => {
                    console.log('print', this.$t('m.confirm'));
                },
                onCancel: () => {
                    console.log('print', this.$t('m.cancel'));
                },
            });
        },
        manageCamera() {
            this.isOpenCamera = !this.isOpenCamera
        },
        takePicture(img) {
            this.imagesList = this.imagesList.concat([{ src: img }])
        },
    },
    beforeDestroy() {
        // 要移除事件的监听，这里的传参必须和监听事件的传参一样，即：('visibilitychange', this.linsteningEvent)
        // 否则无法清楚监听
        document.removeEventListener('visibilitychange', this.linsteningEvent)
    },
};
</script>

<style lang="scss" scoped>
@import "~@/css/common.scss";
@import '~@/components/transition/transition.scss';

.page-a {
    padding-bottom: 50px;
    box-sizing: border-box;
    .changeable-container{
        height: 100px;
        width: 100%;
        background-color: greenyellow;
        &.expend-changeable-container{
            height: 500px;
            background-color: red;
        }
    }
    .content{
        overflow-y: auto;
    }
    .live-container{
        width: 100%;
        height: 300px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        .camera-container-box{
            width: 300px;
            height: 300px;
        }
        .snapshot-container{
            flex: 1;
            height: 100%;
            overflow-y: auto;
            .picture-container{
                width: 100px;
                height: 100px;
                padding: 10px;
                box-sizing: border-box;
                float: left;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .middle{
        background: url('../assets/svgsOutput/next.svg') no-repeat 50% 50%;
    }
    .right{
        progress{
            height: 8px;
            background: yellowgreen;
            border-radius: 20px;
            vertical-align: baseline;
            &::-webkit-progress-bar{
                background-color: yellowgreen;
                border-radius: 20px;
            }
            &::-webkit-progress-value{
                background: red;
                border-radius: 20px;
            }
        }
        .tag{
            padding: 2px 14px;
            background: linear-gradient(to right, #2864F9, #49A9FF);
            border-radius: 20px;
            font-size: 14px;
            color: white;
        }
    }
}
</style>
