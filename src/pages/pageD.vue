<template>
    <div class="D common">
        <common title="d"></common>
        <div class="content">
            <div class="total">
                <!-- 扫码区域 -->
                <div id="outdiv" class="scanning_frame">
                    <video id="v" autoplay></video>
                    <canvas id="qr-canvas"></canvas>
                    <!--加载动画-->
                    <div class="spinner" id="loading">
                        <div class="double-bounce1"></div>
                        <div class="double-bounce2"></div>
                    </div>
                </div>
                <div class="infor">请扫描车上的二维码</div>
                <!-- 展示扫码结果 -->
                <div>
                    <p id="result"></p>
                </div>
            </div>
        </div>
        <div class="bottom">D页面</div>
    </div>
</template>

<script>
import common from "@/components/common";
export default {
    data() {
        return {};
    },
    components: {
        common
    },
    created() {
        const originObject = {
            count: 1,
            str: 'this is origin object',
            arr: [1, 2, 3],
            obj: {
                objName: 'obj data',
                objCount: 10,
            },
        }
        const objProxy = new Proxy(originObject, {
            get: function(target, key, receiver) {
                return Reflect.get(target, key, receiver)
            },
            set: function(target, key, value, receiver) {
                return Reflect.set(target, key, value, receiver)
            }
        })
        objProxy.obj.objName = 'new obj'
        objProxy.arr[0] = 9
        setTimeout(() => {
            console.log(objProxy.arr)
        }, 1000);
    },
    mounted() {
        const originObject = {
            count: 0,
            obj: {
                str: 'hello',
                deepObj: {
                    deepStr: 'deep hello'
                },
            },
            arr: [1, 2, 3],
        }
        function observer(obj) {
            Object.keys(obj).forEach(key => {
                if (typeof obj[key] === 'object') {
                    observer(obj[key])
                }
                defineReactive(obj, key, obj[key])
            })
        }
        function defineReactive(obj, key, val) {
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function() {
                    return val
                },
                set: function(newval) {
                    val = newval
                    console.log(newval)
                },
            })
        }
        observer(originObject)
        setTimeout(() => {
            originObject.obj.deepObj.deepStr = 'deep world'
        }, 2000);
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
</style>