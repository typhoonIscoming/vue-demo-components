<template>
    <div class="PageSubD">
        <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'SubPageD',
    data() {
        return {
            fileList: [],
        }
    },
    methods: {
        handleRemove() {},
        handleChange() {},
        submitUpload() {},
    },
}
</script>

<style lang="scss" scoped>
.PageSubD{
    padding-top: 40px;
    height: 100vh;
}
</style>
