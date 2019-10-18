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
            <textarea type="textarea" class="c-textarea" wrap="hard" v-model="inputContent">
            </textarea>
            <pre v-html="preContent" />
        </div>
        <div class="bottom">c页面</div>
    </div>
</template>

<script>
import common from "@/components/common";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import content from '@/utils/mock'

export default {
    data() {
        return {
            editorOption: {},
            content: '',
            preContent: '',
            inputContent: '',
        };
    },
    components: {
        common,
        quillEditor
    },
    created() {
        this.preContent = this.parse2(content)
        // this.inputContent = this.parse1(content)
    },
    mounted() {
        const el = document.getElementsByClassName('c-textarea')[0]
        el.value = this.parse1(content)
        console.log('el', el.value)
    },
    methods: {
        onEditorBlur() {},
        onEditorFocus() {},
        onEditorChange() {},
        parse2(str) {
            str = this.transferObjectToString(str)
            // 设置缩进为2个空格
            str = JSON.stringify(JSON.parse(str), null, 4);
            str = str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
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
                return '<span class="' + cls + '">' + match + '</span>';
            });
        },
        parse1(str) {
            str = this.transferObjectToString(str)
            return JSON.stringify(JSON.parse(str), null, 4);
        },
        transferObjectToString (obj) {
            if (obj !== null && typeof obj === 'object') return JSON.stringify(obj)
            return obj
        }
    },
    watch: {
        content(newval) {
            console.log("newval", newval);
        },
        inputContent(newval, oldval) {
            console.log('newval', newval)
            console.log('oldval', oldval)
        },
    }
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
        height: 300px;
        width: 500px;
    }
}
</style>