<template>
    <div class="B common">
        <common title="b"></common>
        <div class="content">
            <!-- <a :href="'sms:' + linkPeople">{{ $t('m.sendSMS') }}</a> -->
            <div class="editor-container">
                <!-- <div id="toolbar-container" class="toolbar"></div> -->
                <div id="editor" class="text-container"></div>
            </div>
            <div class="operator">
                <button @click="getData">get Json</button>
                <button @click="$router.push('/subB')">to subB page</button>
                <div style="width: 200px;">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
            </div>
        </div>
        <div class="bottom">
            b{{ $t('m.page') }}
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import common from '@/components/common';
import selectItem from '@/components/pageB/selected'


export default {
    data() {
        return {
            linkPeople: '18502178364',
            editor: null,
            input: '',
        };
    },
    components: {
        common,
        'select-item': selectItem,
    },
    created() {
        const str = '13558513096'
        const reg = /^(\d{3})\d{4}(\d{4})$/;
        console.log('telphone hide', str.replace(reg, '$1****$2'))
    },
    mounted() {
        if (!this.editor) {
            const editor = new E('#editor')
            const keyupEvent = (editorEvent) => {
                console.log(111, editorEvent, editor.txt.getJSON())
            }
            const deleteupEvent = (event) => {
                console.log(222, event, editor.txt.getJSON())
                return false
            }
            editor.config.showLinkImg = false; // 即可隐藏插入网络图片的功能，即只保留上传本地图片
            editor.config.linkCheck = function linkCheck(text, link) {
                console.log(text, link)
                return true
            }
            // editor.config.onchange = () => {
            //     // const text = editor.txt.text();
            //     // console.log('text', text)
            //     // console.log('html', html)
            //     const json = editor.txt.getJSON()
            //     console.log('json', json)
            // }
            editor.config.onchangeTimeout = 500 // 修改为 500ms
            // editor.config.deleteUpEvents = [(e) => {
            //     console.log('e', e)
            // }]
            editor.txt.eventHooks.keyupEvents.push(keyupEvent)
            editor.txt.eventHooks.deleteUpEvents.push(deleteupEvent)
            editor.config.pasteTextHandle = (pasteStr) => {
                console.log('====', pasteStr)
                return pasteStr
            }
            editor.create()
            this.editor = editor
        }
        localStorage.setItem('root', JSON.stringify({ random: (Math.random().toString().substr(3) * 1).toString(36) }))
    },
    methods: {
        getData() {
            const json = this.editor.txt.getJSON()
            console.log('json', json)
        },
        appendData() {

        },
    },
};
</script>

<style lang='scss' scoped>
@import '@/css/common.scss';
.B{
    .select-item{
        border: 1px solid black;
        box-sizing: border-box;
    }
    .editor-container{
        padding: 50px;
        box-sizing: border-box;
    }
    // .text-container{
    //     height: 300px;
    // }
}
</style>
