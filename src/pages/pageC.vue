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
            <textarea type="textarea" class="c-textarea" wrap="hard"
                v-model="inputContent"
                @keyup="keyup"
            >
            </textarea>
            <pre v-html="preContent" />
            <div class="stack-wrapper">
                <stack
                    :pages="someList"
                    :stackinit="stackinit"
                >
                </stack>
            </div>
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
import stack from 'vue-tantan-stack'

const initList = () => ([
    {
        html: '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586334704289&di=fd3f173f7fc2c00a7fac50e688fff3ce&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg" />'
    },
    {
        html: '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586334704287&di=b88cb798b9fcb56eb9e5cedfe25d3d22&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg" />'
    },
])

export default {
    data() {
        return {
            editorOption: {},
            content: '',
            preContent: '',
            inputContent: '',
            someList: [],
            stackinit: {
                visible: 1,
                currentPage: 1,
            },
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
        const el = document.getElementsByClassName('c-textarea')[0]
        el.value = this.parse1(content)
        // console.log('el', el.value)
        setTimeout(() => {
            this.someList = initList()
        }, 2000)
    },
    methods: {
        keyup(e) {
            var input_val = this.inputContent;
            let caretPos
            const ctrl = e.target
            // console.log(e)
            if (document.selection) {
                var sel = document.selection.createRange();
                sel.moveStart ('character', -input_val.length);
                caretPos = Sel.text.length;
            } else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                caretPos = ctrl.selectionStart
            }
            
            console.log('caretPos', caretPos)
        },
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
            try{
                this.inputContent = this.parse1(newval)
            }catch(e){
                console.log(e)
            }
            
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
}
</style>