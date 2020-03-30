<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
            <button @click="isExpand = !isExpand">展开</button>
            <el-collapse-transition>
                <div v-show="isExpand" class="expend">
                    <div class="changeable-container">我的高度可以改变</div>
                </div>
            </el-collapse-transition>
            <p>weufihwfhiowjfoi</p>
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
            <div class="live-container">
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
            </div>
            
        </div>
        <div class="bottom" @click="selectEvent">{{ $t('m.bottom') }}</div>
    </div>
</template>

<script>
import common from "@/components/common";

// import { debounce } from "@/utils/debounce";
import { throttle, debounce } from 'lodash'
import axios from 'axios'
import XhTransition from '@/components/transition/transition'
import ruler from '@/components/rule';
import camera from '@/components/camera';


export default {
    data() {
        return {
            list: [
                { id: 1, relation: "子女", mobile: "13558513096" },
                { id: 2, relation: "子女", mobile: "13558513095" }
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
        };
    },
    components: {
        common,
        [XhTransition.name]: XhTransition,
        'cus-ruler': ruler,
        'cus-camera': camera,
    },
    created() {
        let a = 9,
        b = 5;
        a = a ^ b;
        b = b ^ a;
        a = a ^ b;
    },
    mounted() {
        // document.addEventListener("visibilitychange", this.linsteningEvent);
    },
    methods: {
        rulervalue(value) {
            this.rulerValue = value
        },
        titleTips() {
            this.timer = setTimeout(() => {
                if (document.title === "_") {
                document.title = "消息";
                } else document.title = "_";
                this.titleTips();
            }, 500);
        },
        selectEvent() {
            this.showList = true;
        },
        linsteningEvent() {
            if (document.hidden) {
                //处于当前页面
                console.log("页面被切换了");
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
            function(data) {
                this.showTimes += 1;
                console.log('data', data)
            },
            1000,
            true
        ),
        changeLanguage: debounce(function() {
            const lang = this.$i18n.locale;
            if (lang === "en") {
                this.$i18n.locale = "zh-CN";
            } else if (lang === "zh-CN") {
                this.$i18n.locale = "en";
            }
        }),
        showConfirm() {
            this.$vux.confirm.show({
                title: this.$t("m.title"),
                content: this.$t("m.content"),
                confirmText: this.$t("m.confirm"),
                cancelText: this.$t("m.cancel"),
                onConfirm: () => {
                    console.log("print", this.$t("m.confirm"));
                },
                onCancel: () => {
                    console.log("print", this.$t("m.cancel"));
                }
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

<style lang="scss">
@import "~@/css/common.scss";
@import '~@/components/transition/transition.scss';

.A {
    .changeable-container{
        height: 200px;
        width: 100%;
        background-color: greenyellow;
        &.expend-changeable-container{
            height: 500px;
            background-color: red;
        }
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
}
</style>