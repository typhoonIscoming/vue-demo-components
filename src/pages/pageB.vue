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
                <button @click="getdata">get Json</button>
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
            this.editor = new E('#editor')
            this.editor.config.showLinkImg = false; // 即可隐藏插入网络图片的功能，即只保留上传本地图片
            this.editor.config.linkCheck = function linkCheck(text, link) {
                console.log(text, link)
                return true
            }
            this.editor.create()
        }
    },
    methods: {
        getdata() {
            const json = this.editor.txt.getJSON()
            console.log('json', json)
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
    .text-container{
        height: 300px;
    }
}
</style>
