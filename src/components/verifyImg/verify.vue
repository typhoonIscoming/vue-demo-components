<template>
    <div class="VerifyContainer">
        <div class="VerifyImg" :style="{ height: parseInt(setSize.imgHeight) + vSpace + 'px' }" @click="handleShow">
            <div
                class="verify-img-panel"
                :style="{ width: setSize.imgWidth, height: setSize.imgHeight }"
            >
                <img
                    :src="backImgBase ? 'data:image/png;base64,' + backImgBase : defaultImg"
                    style="width: 100%; height: 100%; display: block"
                >
                <div
                    v-show="showRefresh"
                    class="verify-refresh"
                    @click="refresh"
                >
                    <i class="iconfont icon-refresh" />
                </div>
                <transition name="tips">
                    <span
                        v-show="tipWords"
                        class="verify-tips"
                        :class="passFlag ? 'suc-bg' : 'err-bg'"
                    >{{ tipWords }}</span>
                </transition>
            </div>
        </div>
        <!--公共部分-->
        <div
            class="VerifyBarArea"
            :style="{
                width: setSize.imgWidth,
                height: barSize.height,
                'line-height': barSize.height,
            }"
        >
            <span class="VerifyMsg">{{ text }}</span>
            <div
                class="VerifyLeftBar"
                :style="{
                    width: leftBarWidth || barSize.height,
                    height: barSize.height,
                    'border-color': leftBarBorderColor,
                    transaction: transitionWidth,
                }"
            >
                <span class="VerifyMsg">{{ finishText }}</span>
                <div
                    class="VerifyMoveBlock"
                    :style="{
                        width: barSize.height,
                        height: barSize.height,
                        transition: transitionLeft,
                        left: moveBlockLeft,
                        background: moveBlockBackgroundColor,
                    }"
                    @touchstart="start"
                    @mousedown="start"
                >
                    <div
                        class="VerifySubBlock"
                        :style="{
                            height: setSize.imgHeight,
                            width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',
                            top: `-${(parseInt(setSize.imgHeight) + vSpace)}px`,
                            'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
                        }"
                    >
                        <img
                            :src="'data:image/png;base64,' + blockBackImgBase"
                            style="width: 100%; height: 100%; display: block"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable guard-for-in, no-restricted-syntax */
import { resetSize } from '@/utils/resetSize'

export default {
    name: 'Verify',
    data() {
        return {
            showRefresh: false,
            backImgBase: '',
            tipWords: '',
            passFlag: false,
            text: '',
            finishText: '',
            moveBlockBackgroundColor: '', // 移动中的滑块背景颜色
            moveBlockLeft: '', // 移动距离
            transitionLeft: '', // 滑块移回左侧的样式
            startMoveTime: null, // 开始滑动时间
            endMovetime: null, // 结束滑动时间
            isEnd: false, // 是否验证完成
            leftBarBorderColor: '#ddd',
            status: false, // 鼠标状态
            setSize: {
                imgHeight: 0,
                imgWidth: 0,
                barHeight: 0,
                barWidth: 0,
            },
            leftBarWidth: null, // .VerifyLeftBar的宽度
            transitionWidth: '',
            blockBackImgBase: '', // 缺失的图片块
            startLeft: 0,
        }
    },
    props: {
        defaultImg: {
            type: String,
            default: '',
        },
        imgSize: {
            type: Object,
            default: () => ({ width: '400px', height: '200px' }),
        },
        blockSize: {
            type: Object,
            default: () => ({ width: '50px', height: '50px' }),
        },
        barSize: {
            type: Object,
            default: () => ({ width: '310px', height: '40px' }),
        },
        explain: {
            type: String,
            default: '向右滑动完成验证',
        },
        vSpace: {
            type: Number,
            default: 5,
        },
    },
    computed: {
        barArea() {
            return this.$el.querySelector('.VerifyBarArea')
        },
        resetSize() {
            return resetSize
        },
    },
    mounted() {
        this.init()
        this.$el.onselectstart = () => false;
    },
    methods: {
        handleShow() {
            this.tipWords = 'dhwhid'
            setTimeout(() => {
                this.tipWords = ''
            }, 2000)
        },
        start(e) {
            e = e || window.event;
            let x;
            if (!e.touches) { // 兼容PC端
                x = e.clientX
            } else { // 兼容移动端
                x = e.touches[0].pageX
            }
            this.startLeft = Math.floor(x - this.barArea.getBoundingClientRect().left)
            this.startMoveTime = +new Date() // 开始滑动的时间
            if (!this.isEnd) {
                this.text = ''
                this.moveBlockBackgroundColor = '#337ab7'
                this.leftBarBorderColor = '#337AB7'
                e.stopPropagation()
                this.status = true
            }
        },
        move(e) {
            e = e || window.event;
            if (this.status && !this.isEnd) {
                let x;
                if (!e.touches) { // 兼容PC端
                    x = e.clientX
                } else { // 兼容移动端
                    x = e.touches[0].pageX
                }
                const barAreaLeft = this.barArea.getBoundingClientRect().left
                let moveBlockLeft = x - barAreaLeft // 小方块相对于父元素的left值
                if (moveBlockLeft >= this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2) {
                    moveBlockLeft = this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2
                }
                if (moveBlockLeft <= 0) {
                    moveBlockLeft = parseInt(parseInt(this.blockSize.width) / 2)
                }
                // 拖动后小方块的left值
                this.moveBlockLeft = `${moveBlockLeft - this.startLeft}px`
                this.leftBarWidth = `${moveBlockLeft - this.startLeft}px`
            }
        },
        end() {
            this.endMovetime = +new Date()
            if (this.status && !this.isEnd) {
                // let moveLeftDistance = parseInt((this.moveBlockLeft || '').replace('px', ''))
                // moveLeftDistance = moveLeftDistance * 310 / parseInt(this.setSize.imgWidth)

                const random = Math.random().toFixed(1)
                setTimeout(() => {
                    if (random > 0.5) {
                        this.moveBlockBackgroundColor = '#5cb85c'
                        this.leftBarBorderColor = '#5cb85c'
                        this.showRefresh = false
                        this.isEnd = true
                        this.passFlag = true
                    } else {
                        this.moveBlockBackgroundColor = '#d9534f'
                        this.leftBarBorderColor = '#d9534f'
                        this.passFlag = false
                        this.tipWords = '验证失败'
                        setTimeout(() => {
                            this.tipWords = '';
                            this.refresh()
                        }, 1000)
                    }
                }, 1000)
            }
        },
        init() {
            this.text = this.explain;
            this.$nextTick(() => {
                const setSize = this.resetSize(this) // 重新设置宽度高度
                for (const key in setSize) {
                    this.$set(this.setSize, key, setSize[key])
                }
                // this.$parent.$emit('ready', this)
            })
            window.removeEventListener('touchmove', this.move)
            window.removeEventListener('mousemove', this.move)

            // 鼠标松开
            window.removeEventListener('touchend', this.end)
            window.removeEventListener('mouseup', this.end)

            window.addEventListener('touchmove', this.move)
            window.addEventListener('mousemove', this.move)

            // 鼠标松开
            window.addEventListener('touchend', this.end)
            window.addEventListener('mouseup', this.end)
        },
        refresh() {
            this.showRefresh = true;
            this.finishText = '';
            this.transitionLeft = 'left .3s';
            this.moveBlockLeft = 0;

            this.leftBarWidth = null
            this.transitionWidth = 'width .3s'

            this.leftBarBorderColor = '#ddd'
            this.moveBlockBackgroundColor = '#fff'

            this.isEnd = false

            setTimeout(() => {
                this.transitionWidth = '';
                this.transitionLeft = '';
                this.text = this.explain
            }, 300)
        },
        getPictrue() {
        },
    },
}
</script>
<style lang='scss' scoped>
@import './verify.scss';

.verify-img-panel{
    position: relative;
    overflow: hidden;
}
.verify-tips {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    &.suc-bg {
        background-color: rgba(92, 184, 92, 0.5);
    }
    &.err-bg {
        background-color: rgba(217, 83, 79, 0.5);
    }
}
.tips-enter,
.tips-leave-to {
    bottom: -30px;
}
.tips-enter-active,
.tips-leave-active {
    transition: bottom .5s;
}
</style>
