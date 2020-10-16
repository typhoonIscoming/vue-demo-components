<template>
    <div class="C common c-page">
        <common title="c"></common>
        <div class="content">
            <!-- <quill-editor
            class="myQuillEditor"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
            />-->
            <!-- <textarea type="textarea" class="c-textarea" wrap="hard"
                v-model="inputContent"
                @keyup="keyup"
            >
            </textarea> -->
            <!-- <pre v-html="preContent" /> -->
            <!-- <div class="stack-wrapper">
                <stack
                    :pages="someList"
                    :stackinit="stackinit"
                >
                </stack>
            </div> -->
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div>
                <div
                    class="delete-picture"
                    @click="clearImg">删除图片</div>

                <div class="get-picture-btn">
                    <input
                        ref="inputMultiple"
                        class="inputPhoto"
                        type="file"
                        accept="image/*"
                        multiple
                        @change="multipleChange"
                    >
                    拍照
                </div>
            </div>
            <div class="show-picture">
                <img v-if="imgSrc" :src="imgSrc" />
            </div>
            <p>方向值是{{ result }}</p>
            <p>定位{{ position }}</p>
        </div>
        <div class="bottom">c页面</div>
    </div>
</template>

<script>
import common from '@/components/common';
import { quillEditor } from 'vue-quill-editor'; // 调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import content from '@/utils/mock'
import stack from 'vue-tantan-stack'
import getImageTag from '@/utils/origination';

const initList = () => ([
])

export default {
    data() {
        return {
            editorOption: {},
            content: '',
            preContent: '',
            inputContent: '',
            someList: [...initList()],
            stackinit: {
                visible: 1,
                currentPage: 1,
            },
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                },
            },
            imgSrc: null,
            result: '',
            position: '',
        };
    },
    components: {
        common,
        quillEditor,
        stack,
    },
    created() {
        this.preContent = this.parse2(content)
        // this.inputContent = this.parse1(content)
    },
    mounted() {
        const self = this
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (ev) => { // step3：用经纬度描述具体位置
                    self.position = `${ev.coords.latitude},${ev.coords.longitude}`;
                    console.log('ev', ev)
                    // document.getElementById('geo').innerHTML = '纬度：'+ev.coords.latitude+' 经度：'+ev.coords.longitude;
                },
                (err) => {
                    self.position = `${err.code}失败`
                    // document.getElementById('geo').innerHTML = err.code+':'+err.message;
                    console.log('err', err.code)
                }, {
                    enableHighAcuracy: true, // 指示浏览器获取高精度的位置，默认为false
                    timeout: 5000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                    maximumAge: 2000, // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                })
        } else {
            self.position = '不支持'
            console.log('不支持')
        }
        // plus.geolocation.getCurrentPosition( function ( p ) {
        //     console.log( "Geolocation\nLatitude:" + p.coords.latitude + "\nLongitude:" + p.coords.longitude +'/'+ p.timestamp );
        // }, function ( e ) {
        //     console.log( "Geolocation error: " + e.message );
        // } ,{provider:'baidu'});
    },
    methods: {
        keyup(e) {
            const input_val = this.inputContent;
            let caretPos
            const ctrl = e.target
            // console.log(e)
            if (document.selection) {
                const sel = document.selection.createRange();
                sel.moveStart('character', -input_val.length);
                caretPos = sel.text.length;
            } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
                caretPos = ctrl.selectionStart
            }

            console.log('caretPos', caretPos)
        },
        parse2(str) {
            let newstr = this.transferObjectToString(str)
            // 设置缩进为2个空格
            newstr = JSON.stringify(JSON.parse(newstr), null, 4);
            newstr = newstr
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            return newstr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
                let cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return `<span class="${cls}">${match}</span>`;
            });
        },
        parse1(str) {
            const newstr = this.transferObjectToString(str)
            return JSON.stringify(JSON.parse(newstr), null, 4);
        },
        transferObjectToString(obj) {
            if (obj !== null && typeof obj === 'object') return JSON.stringify(obj)
            return obj
        },
        multipleChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = (e) => {
                const base64 = 'data:image/png;base64,' + e.target.result.split(',')[1] // eslint-disable-line
                const image = new Image()
                image.src = base64
                image.onload = () => {
                    getImageTag(file).then((result) => {
                        this.result = `${result}`
                        console.log('result', result)
                        const img = this.getRotateImg(image, result)
                        this.imgSrc = img
                        console.log(img)
                    })
                }
            }
        },
        getRotateImg(img, or) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 图片原始大小
            const width = img.width;
            const height = img.height;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            let resultImage
            console.log('or', or)
            switch (or) {
            case 6: // 顺时针旋转90度
                resultImage = this.rotateImg(img, 'right', canvas);
                break;
            case 8: // 逆时针旋转90度
                resultImage = this.rotateImg(img, 'left', canvas);
                break;
            case 3: // 顺时针旋转180度
                resultImage = this.rotateImg(img, 'right', canvas, 2);
                break;
            default:
                resultImage = this.rotateImg(img, 'top', canvas);
                break;
            }
            return resultImage
        },
        /* eslint-disable */
        rotateImg(img, dir = 'right', canvas, s = 1) {
            const MIN_STEP = 0;
            const MAX_STEP = 3;

            const width = canvas.width || img.width;
            const height = canvas.height || img.height;
            let step = 0;

            if (dir === 'right') {
                step += s;
                step > MAX_STEP && (step = MIN_STEP);
            } else {
                step -= s;
                step < MIN_STEP && (step = MAX_STEP);
            }

            const degree = step * 90 * Math.PI / 180;
            const ctx = canvas.getContext('2d');

            switch (step) {
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height, width, height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height, width, height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0, width, height);
                break;
            default:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                break;
            }
            const result = canvas.toDataURL('image/png');
            console.log('===', result)
            return result
        },
        /* eslint-enable */
        clearImg() {
            this.$nextTick(() => {
                this.imgSrc = ''
            })
        },
    },
    watch: {
        content(newval) {
            console.log('newval', newval);
        },
        inputContent(newval) {
            console.log('newval', newval)
            try {
                this.inputContent = this.parse1(newval)
            } catch (e) {
                console.log(e)
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.myQuillEditor {
    width: 100%;
    height: 100%;
}
.c-page{
    .c-textarea{
        height: 100px;
        width: 500px;
    }
    .stack-wrapper{
        margin: 0 auto;
        position: relative;
        z-index: 1000;
        width: 320px;
        height: 320px;
        padding: 0;
        list-style: none;
        pointer-events: none;
    }
    .delete-picture{
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        float: left;
        background-color: chocolate;
        border-radius: 30px;
    }
    .get-picture-btn{
        width: 50%;
        height: 30px;
        line-height: 30px;
        background-color: chartreuse;
        position: relative;
        border-radius: 30px;
        text-align: center;
        overflow: hidden;
        margin: 0 auto;
        .inputPhoto{
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
    .show-picture{
        width: 100%;
        height: 100px;
        margin-top: 20px;
        >img{
            height: 100%;
            margin-right: 20px;
        }
    }
}
</style>
