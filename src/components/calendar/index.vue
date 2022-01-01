<style lang="scss" scoped>
@media screen and (min-width: 460px) {
    .wh_item_date:hover {
        background: #71c7a5;
        cursor: pointer;
    }
}
* {
    margin: 0;
    padding: 0;
}

.wh_container {
    width: 100%;
}

li {
    list-style-type: none;
}
.wh_top_changge {
    display: flex;
}

.wh_top_changge li {
    cursor: pointer;
    display: flex;
    color: #111111;
    font-size: 18px;
    flex: 0.2;
    justify-content: center;
    align-items: center;
    height: 47px;
}

.wh_top_changge .wh_content_li {
    cursor: auto;
    flex: 1;
}
.wh_content_all {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    background-color: #ffffff;
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
}

.wh_content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3% 0 3%;
    width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
    color: #111111;
    font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
    font-size: 15px;
    width: 13.4%;
    text-align: center;
    color: #111111;
    position: relative;
}
.wh_content_item {
    height: 30px;
}

.wh_top_tag {
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wh_item_date {
    width: 30px;
    height: 30px;
    line-height: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wh_jiantou1 {
    width: 0.2rem;
    height: 0.2rem;
    border-top: 2px solid #999;
    border-left: 2px solid #999;
    transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
    border-color: #ddd;
}

.wh_jiantou2 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #111111;
    border-right: 2px solid #111111;
    transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
    margin: auto;
    // background:rgba(250,95,95,1);
    border-radius: 50%;
    z-index: 2;
    &::after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        bottom: -30px;
        border-radius: 50%;
        left: 0;
        right: 0;
        margin: auto;
        background: red;
    }
}
.wh_content_item .wh_other_dayhide {
    color: #9e9fa0;
}
.wh_content_item .wh_want_dayhide {
    color: #9e9fa0;
}
.wh_content_item .wh_isToday {
    background: #5faefa;
    border-radius: 50px;
}
.wh_content_item .wh_chose_day {
    background: #5faefa;
    border-radius: 100px;
}
</style>
<template>
    <div class="wh_container">
        <div class="wh_content_all">
            <div class="wh_top_changge">
                <li @click="PreMonth(myDate, false)">
                    <div class="wh_jiantou1"></div>
                </li>
                <!-- year month -->
                <li class="wh_content_li">{{ dateTop }}</li>
                <li @click="NextMonth(myDate,false)">
                    <div class="wh_jiantou2"></div>
                </li>
            </div>
            <div class="wh_content">
                <!-- week -->
                <div
                    class="wh_content_item"
                    v-for="(tag, index) in textTop"
                    :key="index"
                >
                    <div class="wh_top_tag">{{ tag }}</div>
                </div>
            </div>
            <div
                class="wh_content"
                @touchstart="startEven($event)"
                @touchend="endEven($event)"
            >
                <div
                    class="wh_content_item"
                    v-for="(item, index) in list"
                    :key="index"
                    @click="clickDay(item, index)"
                >
                    <div
                        class="wh_item_date"
                        v-bind:class="[
                            { wh_isMark: item.isMark },
                            {
                                wh_other_dayhide: item.otherMonth !== 'nowMonth'
                            },
                            { wh_want_dayhide: item.dayHide },
                            { wh_isToday: item.isToday },
                            { wh_chose_day: item.chooseDay },
                            setClass(item)
                        ]"
                    >
                        {{ item.id }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import timeUtil from './utils';

export default {
    data() {
        return {
            myDate: [],
            list: [],
            historyChose: [],
            dateTop: "",

            touchStartX: "",
            touchEndX: "",
            touchStartY: "", // 点击y轴的坐标
            touchEndY: "" // 结束触摸的坐标
        };
    },
    props: {
        markDate: {
            type: Array,
            default: () => []
        },
        markDateMore: {
            type: Array,
            default: () => []
        },
        textTop: {
            type: Array,
            default: () => ["日", "一", "二", "三", "四", "五", "六"]
        },
        sundayStart: {
            type: Boolean,
            default: () => false
        },
        agoDayHide: { type: String, default: `0` },
        futureDayHide: { type: String, default: `2554387200` }
    },
    created() {
        this.intStart();
        this.myDate = new Date();
    },
    methods: {
        intStart() {
            timeUtil.sundayStart = this.sundayStart;
        },
        setClass(data) {
            let obj = {};
            obj[data.markClassName] = data.markClassName;
            return obj;
        },
        clickDay: function(item, index) {
            if (item.otherMonth === "nowMonth" && !item.dayHide) {
                this.getList(this.myDate, item.date);
            }
            if (item.otherMonth !== "nowMonth") {
                item.otherMonth === "preMonth"
                    ? this.PreMonth(item.date)
                    : this.NextMonth(item.date);
            }
        },
        ChoseMonth: function(date, isChosedDay = true) {
            date = timeUtil.dateFormat(date);
            this.myDate = new Date(date);
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        PreMonth: function(date, isChosedDay = false) {
            console.log('date', date, isChosedDay)
            date = timeUtil.dateFormat(date);
            this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
            console.log('this.myDate', this.myDate)
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        NextMonth: function(date, isChosedDay = true) {
            console.log('datedate', date)
            date = timeUtil.dateFormat(date);
            console.log('date', date)
            this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
            console.log('NextMonth', this.myDate)
            this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        forMatArgs: function() {
            let markDate = this.markDate;
            let markDateMore = this.markDateMore;
            markDate = markDate.map(k => {
                return timeUtil.dateFormat(k);
            });
            markDateMore = markDateMore.map(k => {
                k.date = timeUtil.dateFormat(k.date);
                return k;
            });
            return [markDate, markDateMore];
        },
        getList: function(date, chooseDay, isChosedDay = true, isWeek) {
            const [markDate, markDateMore] = this.forMatArgs();
            this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
            if (isWeek) this.myDate = new Date(date);
            let arr = timeUtil.getMonthList(this.myDate);
            for (let i = 0; i < arr.length; i++) {
                let markClassName = "";
                let k = arr[i];
                k.chooseDay = false;
                const nowTime = k.date;
                const t = new Date(nowTime).getTime() / 1000;
                // console.log("print this.mydate in getlist", this.myDate);
                //看每一天的class
                for (const c of markDateMore) {
                    if (c.date === nowTime) {
                        markClassName = c.className || "";
                    }
                }
                //标记选中某些天 设置class
                k.markClassName = markClassName;
                k.isMark = markDate.indexOf(nowTime) > -1;
                //无法选中某天
                k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
                if (k.isToday) {
                    this.$emit("isToday", nowTime);
                }
                let flag = !k.dayHide && k.otherMonth === "nowMonth";
                if (chooseDay && chooseDay === nowTime && flag) {
                    this.$emit("choseDay", nowTime);
                    this.historyChose.push(nowTime);
                    k.chooseDay = true;
                } else if (
                    this.historyChose[this.historyChose.length - 1] ===
                        nowTime &&
                    !chooseDay &&
                    flag
                ) {
                    k.chooseDay = true;
                }
            }
            if (isWeek) {
                let dd = date.getDate();
                let ww = date.getDay();
                let index = arr.findIndex(item => {
                    return item.id === dd;
                });
                index -= ww - 1;
                let week = [];
                let len = index + 7;
                for (; index < len; index++) {
                    week.push(arr[index]);
                }
                arr = week;
            }

            this.list = arr;
        },
        startEven(e) {
            this.touchStartY = e.changedTouches[0].clientY;
            this.touchStartX = e.changedTouches[0].clientX;
        },

        endEven(e) {
            this.touchEndY = e.changedTouches[0].clientY;
            this.touchEndX = e.changedTouches[0].clientX;

            let direction = this.touchEndY - this.touchStartY;
            let sideslip = this.touchEndX - this.touchStartX;

            let date = new Date().toLocaleDateString();
            const isYmore = Math.abs(direction) - Math.abs(sideslip);
            if (direction < 30 && isYmore > 0) {
                this.getList(new Date(), date, true, true);
            } else if (direction > 30 && isYmore > 0) {
                this.getList(new Date(), date);
            }

            let skipDate = null;

            if (sideslip > -50 && isYmore < 0) {
                skipDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
                this.PreMonth(skipDate);
            } else if (sideslip < 50 && isYmore < 0) {
                let skipDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
                this.NextMonth(skipDate);
            }
        }
    },
    mounted() {
        this.getList(this.myDate);
    },
    watch: {
        markDate: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        markDateMore: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        agoDayHide: {
            handler(val, oldVal) {
                // this.agoDayHide = parseInt(val);
                this.getList(this.myDate);
            },
            deep: true
        },
        futureDayHide: {
            handler(val, oldVal) {
                // this.futureDayHide = parseInt(val);
                this.getList(this.myDate);
            },
            deep: true
        },
        sundayStart: {
            handler(val, oldVal) {
                this.intStart();
                this.getList(this.myDate);
            },
            deep: true
        }
    }
};
</script>
