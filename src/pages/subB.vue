<template>
    <div class="sub-b-page common">
        <div class="operator-container">
            <button @click="getdata">get data</button>
        </div>
        <div class="editor-container">
            <div class="editor-content">
                <TseEditor
                    :setting="init"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TseEditor from '@/components/editor';

export default {
    data() {
        return {
            init: {
                selector: 'tiny-editor',
                language: 'zh_CN', // 语言
                height: 300, // 编辑器高度
                branding: false, // 是否禁用“Powered by TinyMCE”
                menubar: false, // 顶部菜单栏显示
                toolbar1: `undo redo | fullscreen | alignleft aligncenter alignright alignjustify
                    bold italic underline strikethrough superscript subscript | indent outdent | link | unlink | numlist bullist | image media table
                    forecolor backcolor | removeformat fontsizeselect`,
                toolbar2: '',
                toolbar_mode: 'sliding', // floating / sliding / scrolling / wrap 菜单是自动换行还是放进抽屉
                quickbars_selection_toolbar: 'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
                plugins: 'link image media table lists fullscreen quickbars autoresize',
                forced_root_block: '',
                elementpath: false,
                statusbar: false,
                toolbar_sticky: true,
                // inline: true,
                fixed_toolbar_container: '#tiny-tool-bar-fixed',
                body_class: 'enc-editor-edit-content',
                content_style: 'height: 100px;',
                placeholder: '正文内容',
                visual_anchor_class: 'edit-content-anchor',
                min_height: 1500,
                autoresize_bottom_margin: 140,
                // icons: 'custom',
                fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
            },
        }
    },
    mounted() {
        // const editorContent = document.getElementsByClassName('editor-content')[0]
        // editorContent.addEventListener('scroll', () => {
        //     console.log(234)
        // })
        // console.log('editorContent', editorContent)
    },
    methods: {
        editorScroll() {
            console.log(2345)
        },
        getdata() {},
    },
    components: {
        TseEditor,
    },
}
</script>

<style scoped lang="scss">
@import '@/css/common.scss';

.sub-b-page{
    height: 100%;
    .editor-container{
        flex: 1;
        overflow-y: auto;
        .editor-content{
            height: 100%;
            overflow-y: auto;
            position: relative;
        }
    }
}
</style>
