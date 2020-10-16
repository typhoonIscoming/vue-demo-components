<template>
    <div class="ruler-container">
        <div class="d4"></div>
        <div class="ruler-wrap" style="width: 100%;" id="ruler"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.init();
    },
    watch: {
        value: {
            handler() {
                this.$emit('rulervalue', this.value);
            },
        },
        startValue: {
            handler() {
                this.init();
            },
        },
    },
    props: {
        startValue: {
            type: Number,
            default: 0,
        },
        maxScale: {
            type: Number,
            default: 0,
        },
        minScale: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        // 调用刻度尺方法
        init() {
            // var rulerText3 = document.getElementById('rulerText3')
            // rulerText3.value = 20
            // 调用刻度尺方法
            const that = this;
            this.initPlugin({
                el: 'ruler', // 容器id
                height: 50, // 刻度尺高度
                maxScale: this.maxScale, // 最大刻度
                startValue: this.startValue, // 刻度开始的初始值
                region: [this.minScale, this.maxScale], // 选择刻度的区间范围
                // background: '#ffa43c', //刻度尺背景色
                color: '#fff', // 刻度线和字体的颜色
                markColor: '#fff', // 中心刻度标记颜色
                isConstant: true, // 是否不断地获取值
                success(res) {
                    that.value = res;
                },
            });
        },
        /* eslint-disable */
        initPlugin(params) {
            const initParams = {
                el: params.el,
                height: params.height || 60,
                maxScale: params.maxScale,
                startValue: params.startValue || 0,
                region: params.region || false,
                background: params.background || false,
                color: params.color || false,
                markColor: params.markColor || '#FFCC33',
                isConstant: params.isConstant || false,
            };

            if (!initParams.el) {
                console.warn('没有容器元素的参数');
                return false;
            }

            const rulerWrap = document.getElementById(initParams.el); // 获取容器
            rulerWrap.style.height =
                initParams.height < 50 ? `${50}px` : `${initParams.height}px`;

            // 最大刻度的小值是50
            initParams.maxScale =
                initParams.maxScale < 50 ? 50 : initParams.maxScale;

            if (initParams.startValue > initParams.maxScale) {
                initParams.startValue = initParams.maxScale;
            }

            let minSildeNum = 0; // 最小滑动的值
            let maxSildeNum = initParams.maxScale; // 最大滑动的值

            if (initParams.region) {
                minSildeNum = Math.floor(initParams.region[0]);
                maxSildeNum = Math.floor(initParams.region[1]);
            }

            let count = initParams.startValue; // 初始值

            const winWidth = rulerWrap.offsetWidth; // 容器宽度
            const division = winWidth / 16; // 每个刻度的距离 分割线
            // 刻度值数组
            const scaleValueList = [];
            for (let i = 0; i <= initParams.maxScale; i += 5) {
                scaleValueList.push(i);
            }
            let canvas = rulerWrap.getElementsByTagName('canvas')[0]; // 获取容器下的canvas标签
            // 没有canvas就创建一个
            if (!canvas) {
                canvas = document.createElement('canvas'); // 创建canvas标签
                canvas.width = winWidth;
                canvas.height = initParams.height;
                rulerWrap.appendChild(canvas);
            }
            const cxt = canvas.getContext('2d');

            if (window.devicePixelRatio) {
                canvas.width = window.devicePixelRatio * winWidth;
                canvas.height = window.devicePixelRatio * initParams.height;
                cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
            }

            // 画刻度尺
            function drawRuler(count) {
                count -= 8;

                // 清空画布
                cxt.clearRect(0, 0, winWidth, initParams.height);

                // 刻度尺背景
                if (initParams.background) {
                    cxt.fillStyle = initParams.background;
                    cxt.fillRect(0, 0, canvas.width, initParams.height);
                }

                // 画刻度线
                for (let i = 0; i < initParams.maxScale; i++) {
                    cxt.beginPath();
                    cxt.save();
                    cxt.strokeStyle = initParams.color
                        ? initParams.color
                        : '#bbb';
                    cxt.lineWidth = 2;
                    cxt.lineCap = 'round';
                    cxt.moveTo(division * i - count * division, 0);
                    cxt.lineTo(
                        division * i - count * division,
                        Math.floor(initParams.height * 0.3),
                    );

                    // if (i % 2 === 0) {
                    //   cxt.strokeStyle = initParams.color ? initParams.color : '#999'
                    //   cxt.lineTo(division * i - count * division, Math.floor(initParams.height * 0.3))
                    // }
                    if (i % 5 === 0) {
                        cxt.strokeStyle = initParams.color
                            ? initParams.color
                            : '#666';
                        cxt.lineTo(
                            division * i - count * division,
                            Math.floor(initParams.height * 0.5),
                        );
                    }

                    cxt.stroke();
                    cxt.restore();
                    cxt.closePath();
                }

                // 添加体重数字
                cxt.beginPath();
                cxt.font = '14px Arial';
                cxt.fillStyle = initParams.color ? initParams.color : '#333';
                cxt.textAlign = 'center';
                cxt.textBaseline = 'middle';
                scaleValueList.forEach((num, i) => {
                    cxt.fillText(
                        `${num.toString()}岁`,
                        division * i * 5 - count * division,
                        Math.floor(initParams.height * 0.78),
                    );
                });
                cxt.closePath();

                // 中心刻度线
                cxt.beginPath();
                cxt.save();
                cxt.strokeStyle = initParams.markColor;
                cxt.lineWidth = 2;
                cxt.lineCap = 'round';
                cxt.moveTo(winWidth / 2, 0);
                cxt.lineTo(winWidth / 2, Math.floor(initParams.height * 0.35));
                cxt.stroke();
                cxt.restore();
                cxt.closePath();
            }

            if (window.devicePixelRatio) {
                canvas.style.transform =
                    `scale(${1 / window.devicePixelRatio})`;
                canvas.style.transformOrigin = 'left top';
            }

            drawRuler(count);

            // 滑动相关
            let initX = 0, // 初始x 距离
                endX = 0, // 结束x 距离
                distanceX = 0, // 移动距离
                _distanceX = 0, // 判断用的移动距离
                lastX = count; // 上次移动距离

            if (!canvas) return false;

            // 手指按下
            canvas.addEventListener(
                'touchstart',
                (e) => {
                    initX = e.targetTouches[0].pageX;
                },
                false,
            );

            // 手指滑动
            canvas.addEventListener(
                'touchmove',
                (e) => {
                    endX = e.targetTouches[0].pageX;
                    moveEvent();
                },
                false,
            );

            // 手指抬起
            canvas.addEventListener(
                'touchend',
                (e) => {
                    lastX = count;
                    overEvent();
                },
                false,
            );

            let isMouseDown = false; // 鼠标是否按下

            // 鼠标按下
            canvas.addEventListener(
                'mousedown',
                (e) => {
                    isMouseDown = true;
                    initX = e.layerX;
                },
                false,
            );

            // 鼠标移动
            canvas.addEventListener(
                'mousemove',
                (e) => {
                    if (!isMouseDown) {
                        return false;
                    }
                    endX = e.layerX;
                    moveEvent();
                },
                false,
            );

            // 鼠标抬起&离开
            canvas.addEventListener(
                'mouseup',
                (e) => {
                    lastX = count;
                    isMouseDown = false;
                    overEvent();
                },
                false,
            );

            canvas.addEventListener(
                'mouseleave',
                (e) => {
                    if (isMouseDown) {
                        lastX = count;
                        isMouseDown = false;
                        overEvent();
                    }
                },
                false,
            );

            // 手指&鼠标移动事件
            function moveEvent() {
                // console.log('initX - endX', initX - endX)
                distanceX = Math.floor((initX - endX) / (winWidth / 30));
                if (distanceX === _distanceX) {
                    return false;
                }
                _distanceX = distanceX;
                count = lastX + distanceX;

                if (count >= initParams.maxScale || count <= 0) {
                    count =
                        count >= initParams.maxScale ? initParams.maxScale : 0;
                }
                drawRuler(count);

                if (initParams.isConstant) {
                    params.success && params.success(count);
                }
            }

            // 手指&鼠标结束事件
            function overEvent() {
                if (count > maxSildeNum) {
                    lastX = count = count > maxSildeNum ? maxSildeNum : count;
                } else if (count < minSildeNum) {
                    lastX = count = count < minSildeNum ? minSildeNum : count;
                }
                drawRuler(count);

                // 返回最后的值
                params.success && params.success(count);
            }
        },
        /* eslint-enable */
    },
};
</script>

<style lang="scss" scoped>
.ruler-container{
    background: red;
    width: 100%;
    height: 80px;
}
.ruler-wrap {
    width: 100%;
    max-width: 600px;
    /*height: 60px;*/
    line-height: 1px;
    overflow: hidden;
    margin: 0 auto 50px;
}

.text-input {
    display: block;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background: #f6f6f6;
    border: none;
    text-align: center;
    font-size: 14px;
    color: #4142cc;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 0 auto;
}

.text-input:focus {
    outline: none;
}

.d4 {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-width: 15px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    color: yellow;
}
</style>
