<template>
    <div class="sub-b-page common">
        <div class="operator-container">
            <button @click="getdata">get data</button>
        </div>
        <div class="editor-container">
            <!-- <ckeditor :editor="Editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
            <div id="editor"></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            editorInstance: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
        },
        getdata() {
        },
    },
}
</script>

<style scoped lang="scss">
@import '@/css/common.scss';

.sub-b-page{
    height: 100%;
}
</style>
