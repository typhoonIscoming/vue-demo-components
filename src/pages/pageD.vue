<template>
    <div class="D common page-d-container">
        <common title="d"></common>
        <div class="content">
            <!-- <xh-scroll-index>
            </xh-scroll-index> -->
            <input id="file" type="file" @change="selectedImage" />
            <img v-if="file" :src="file" />
        </div>
        <div class="bottom">D页面</div>
    </div>
</template>

<script>
import common from '@/components/common';
import scrollIndex from '@/components/scrollIndex';

export default {
    data() {
        return {
            list: [],
            file: '',
        };
    },
    components: {
        common,
        'xh-scroll-index': scrollIndex,
    },
    created() {

    },
    mounted() {
        console.log(123)
    },
    methods: {
        selectedImage(event) {
            const file = event.target.files[0];
            console.log('转换前', file)
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
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.page-d-container{
    #container{
        width: 100%;
        height: 100%;
    }
}
</style>
