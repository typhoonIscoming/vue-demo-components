<template>
    <div class="D common page-d-container" ref="pageContent">
        <common title="d"></common>
        <div class="content">
            <span @click="getPictrue">添加弹幕</span>
            <span @click="handleRoute">跳转到SubD页面</span>
            <!-- <Uploader /> -->
            <input type="file" webkitdirectory @change="handleChange" />
            <!-- <div>
                <img class="ImagePic" :src="imageUrl1" />
            </div>
            <div>
                <img class="ImagePic" :src="imageUrl2" />
            </div> -->
            <!-- <xh-scroll-index>
            </xh-scroll-index> -->
            <!-- <input id="file" type="file" @change="selectedImage" />
            <img v-if="file" :src="file" /> -->
            <!-- <div class="list-content grid">
                <div
                    v-for="item in 20"
                    :key="item"
                    class="item">
                    <div class="item-content">
                        {{ item }} : {{ width }}
                    </div>
                </div>
            </div> -->
            <!-- <div class="Barrage">
                <VueBaberrage
                    :isShow="barrageIsShow"
                    :barrageList="barrageList"
                    :loop="barrageLoop"
                />
            </div> -->
        </div>
        <div class="bottom">D页面</div>

        <el-dialog
            title="显示图片"
            :visible.sync="dialogVisible"
            width="90%"
            custom-class="showShotPicture"
        >
            <div class="ShotPictureContent">
                <img class="imageShot" :src="shotPicture" alt="">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
/* eslint-disable */
// import { VueBaberrage, MESSAGE_TYPE } from 'vue-baberrage'
import common from '@/components/common';
import scrollIndex from '@/components/scrollIndex';
import { getBase64, getImgBase64 } from '@/utils/compress';
import jsonp from 'jsonp';
import api from '@/api';
import Uploader from 'vue-simple-uploader'

const VueBaberrage = require('vue-baberrage').vueBaberrage;

// console.log('VueBaberrage', VueBaberrage)

export default {
    data() {
        return {
            list: [],
            file: '',
            width: null,
            barrageLoop: false,
            barrageList: [],
            barrageIsShow: true,
            currentId: 0,
            shotPicture: null,
            dialogVisible: false,
            imageUrl1: null,
            imageUrl2: null,
        };
    },
    components: {
        common,
        'xh-scroll-index': scrollIndex,
        VueBaberrage,
        Uploader,
    },
    created() {
        this.addToList();
        const img1 = 'http://lanhai.oss-cn-chengdu.aliyuncs.com/images/member-data/111/20220804/11193024013173120.jpg';
        const img2 = 'http://lanhai.oss-cn-chengdu.aliyuncs.com/images/member-data/111/20220804/11192938074243456.jpg';
        getBase64(img2)
        .then((base) => {
            this.imageUrl2 = base;
        });

        getImgBase64(img1).then((base) => {
            this.imageUrl1 = base;
        })
    },
    mounted() {
        // const el = document.getElementsByClassName('item');
        // this.width = el[0].getBoundingClientRect().width;
        // this.width = this.width.toFixed(2)
        // window.addEventListener('resize', () => {
        //     this.width = el[0].getBoundingClientRect().width.toFixed(2)
        // })
        const params = {
            types: ['cms_image_tag']
        };
        api.test(params).then((res) => {
            console.log('===', res)
        })
    },
    methods: {
        handleChange(e) {
            console.log(e.target.files)
        },
        getPictrue() {
            html2canvas(
                this.$refs.pageContent,
                {
                    width: 375,
                    height: 750,
                    allowTaint: true,
                    useCORS: true,
                    taintTest: true, // 在渲染前测试图片
                    timeout: 1000, // 加载延时
                    backgroundColor: 'transparent',
                }
            ).then((canvas) => {
                this.dialogVisible = true;
                this.shotPicture = canvas.toDataURL('image/png');
            })
        },
        handleAdd() {
            const msg = Math.random().toString().slice(2).toString(36);
            this.addToList(msg)
        },
        addToList(msg) {
            this.barrageList.push({
                id: this.currentId += 1,
                // avatar: "./static/avatar.jpg",
                msg,
                time: 5,
                // type: MESSAGE_TYPE.NORMAL,
            })
        },
        selectedImage(event) {
            const file = event.target.files[0];
            this.compressFile(file, (files) => {
                this.file = window.URL.createObjectURL(files);
                console.log('转换后', files)
            })
        },
        compressFile(file, callback) {
            if (!file || !callback) {
                callback(null)
                return
            }
            const fileObj = file;
            const fileName = fileObj.name;
            const fileType = fileObj.type;
            const reader = new FileReader()
            reader.readAsDataURL(fileObj) // 转base64
            reader.onload = (e) => {
                const image = new Image() // 新建一个img标签（还没嵌入DOM节点)
                image.src = e.target.result
                image.onload = () => {
                    const canvas = document.createElement('canvas') // 新建canvas
                    const context = canvas.getContext('2d');
                    const imageWidth = image.width / 2; // 压缩后图片的大小
                    const imageHeight = image.height / 2;
                    let data = ''
                    canvas.width = imageWidth
                    canvas.height = imageHeight
                    context.drawImage(image, 0, 0, imageWidth, imageHeight)
                    data = canvas.toDataURL(fileType, 0.5) // 输出压缩后的base64
                    const arr = data.split(',');
                    const mime = arr[0].match(/:(.*?);/)[1]; // 转成blob
                    const bstr = atob(arr[1]);
                    let n = bstr.length;
                    const u8arr = new Uint8Array(n);
                    while (n--) { // eslint-disable-line
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    const files = new window.File([new Blob([u8arr], { type: mime })], fileName) // 转成file
                    callback(files) // 回调
                }
            }
        },
        handleRoute() {
            this.$router.push('/subD')
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";

@mixin randomColor() {
    $r: random(255);
    $g: random(255);
    $b: random(255);
    background-color: rgba($r, $g, $b, random(1));
}


@for $i from 1 through 20 {
    .item:nth-child(#{$i}) {
        @include randomColor();
        // animation: colorChange 5s infinite alternate;
    }
}

@keyframes colorChange{
    0%{ @include randomColor() }
    20%{ @include randomColor() }
    60%{ @include randomColor() }
    100%{ @include randomColor() }
}

.page-d-container{
    #container{
        width: 100%;
        height: 100%;
    }
    .list-content{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .item{
            text-align: center;
            // padding: 0 30px;
            box-sizing: border-box;
        }
        .item-content{
            width: 100%;
            // height: 100%;
            // background: red;
        }
    }
    .grid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        // grid-template-columns: minmax(100px, 200px) repeat(auto-fill, 200px) 20%;
        // grid-template-columns: 1fr 2fr 3fr;
        grid-gap: 20px;
    }
    .Barrage{
        height: 300px;
        position: relative;
    }
    .ImagePic{
        max-width: 100%;
        object-fit: contain;
    }
}
</style>
<style lang="scss">
.showShotPicture{
    .ShotPictureContent{
        width: 100%;
    }
    .imageShot{
        max-width: 100%;
        object-fit: contain;
    }
}
</style>