<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
            <button @click="test">测试实现debounce，点击第{{ index }}次,显示第{{ showTimes }}次</button>
            <button @click="changeLanguage">{{ $t('m.changeLanguage') }}</button>
            <p>
                <button @click="showConfirm">{{ $t('m.show') + $t('m.frame') }}</button>
            </p>
            <div class="icon-img">
                <!-- <img :src="sprite" alt="sprite.png"> -->
            </div>
        </div>
        <div class="bottom" @click="selectEvent">{{ $t('m.bottom') }}</div>
    </div>
</template>

<script>
import common from "@/components/common";

import { debounce } from "@/utils/debounce";
import { throttle, debounce } from 'lodash'


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
        timer: null
        };
    },
    components: {
        common,
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
        }
    },
    beforeDestroy() {
        console.log(111)
        // 要移除事件的监听，这里的传参必须和监听事件的传参一样，即：('visibilitychange', this.linsteningEvent)
        // 否则无法清楚监听
        document.removeEventListener('visibilitychange', this.linsteningEvent)
    },
};
</script>

<style lang="scss">
@import "~@/css/common.scss";
.A {
    #video {
        width: 100%;
        height: 200px;
    }
}
</style>