
export default function compress(file, callback, ratio = 0.5) {
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
            data = canvas.toDataURL(fileType, ratio) // 输出压缩后的base64
            const arr = data.split(',');
            const mime = arr[0].match(/:(.*?);/)[1]; // 转成blob
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) { // eslint-disable-line
                u8arr[n] = bstr.charCodeAt(n);
            }
            const files = new window.File([new Blob([u8arr], { type: mime })], fileName, { type: fileType }) // 转成file
            callback(files) // 回调
        }
    }
}
