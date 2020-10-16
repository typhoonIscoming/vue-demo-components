<template>
    <div id="camera" class="camera-container">
        <div id="contentHolder" class="camera-content">
            <video id="video" width="300" height="300" autoplay></video>
            <canvas style="display:none;" id="canvas" width="300" height="300"></canvas>
        </div>
        <div id="btn_snap">拍照</div>
    </div>
</template>
<script>
export default {
    name: 'Camera',
    data() {
        return {
            stream: null,
            video: null,
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        const pzBtn = document.getElementById('btn_snap');
        pzBtn.addEventListener('click', () => {
            this.takePicture()
        })
    },
    methods: {
        init() {
            const that = this
            const video = document.getElementById('video');
            // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }
            // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
            // 使用getUserMedia，因为它会覆盖现有的属性。
            // 这里，如果缺少getUserMedia属性，就添加它。
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function name(constraints) {
                    // 首先获取现存的getUserMedia(如果存在)
                    const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    // 有些浏览器不支持，会返回错误信息
                    // 保持接口一致
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                    return new Promise(((resolve, reject) => {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    }));
                }
            }
            const constraints = { audio: false, video: { width: 720, height: 720 } }
            this.video = video
            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    console.log(stream)
                    // 旧的浏览器可能没有srcObject
                    if ('srcObject' in video) {
                        video.srcObject = stream;
                    } else {
                    // 避免在新的浏览器中使用它，因为它正在被弃用。
                        video.src = window.URL.createObjectURL(stream);
                    }
                    that.stream = stream
                    video.onloadedmetadata = function name() {
                        video.play();
                    };
                })
                .catch((err) => {
                    console.log(`${err.name}: ${err.message}`);
                });
        },
        takePicture() {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            // 点击，canvas画图
            context.drawImage(this.video, 0, 0, 300, 300);
            // 获取图片base64链接
            const image = canvas.toDataURL('image/png');
            // 定义一个img
            // var img = new Image();
            // //设置属性和src
            // img.id = "imgBoxxx";
            // img.src = image;
            // 将图片添加到页面中
            this.$emit('takePicture', image)
            // // base64转文件
            // function dataURLtoFile(dataurl, filename) {
            //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            //     while (n--) {
            //         u8arr[n] = bstr.charCodeAt(n);
            //     }
            //     return new File([u8arr], filename, {type: mime});
            // }
        },
        closeCamera() {
            if (this.stream) this.stream.getTracks()[0].stop()
        },
    },
    watch: {
        isOpen(newval) {
            if (newval) this.init()
            else this.closeCamera()
        },
    },
};
</script>
<style lang="scss" scoped>
.camera-container{
    .camera-content{
        // text-align: center;
    }
}
</style>
