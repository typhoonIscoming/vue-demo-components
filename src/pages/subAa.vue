<template>
    <div class="sub-a-container common">
        <div class="page-container" v-show="false">
            <div class="left-container">
                <draggable
                    class="dragArea list-group"
                    :list="list"
                    handle=".handle"
                    :group="{ name: 'people', pull: pullFunction }"
                    v-bind="dragOptions"
                    :options="{sort: false, group: {name: 'field', pull:'clone',put: false}}"
                    @start="start"
                    @end="drag = false"
                >
                    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                        <div class="list-group-item" v-for="(element, index) in list" :key="index">
                            {{ element.name }}
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div class="right-container">
                <draggable class="dragArea list-group" :list="dragList" group="people">
                    <div class="list-group-item" v-for="(element, index) in dragList" :key="index">
                        {{ element.name }}
                    </div>
                </draggable>
            </div>
        </div>
        <DragVerifyImg
            v-show="false"
            ref="dragVerify"
            :imgsrc="img"
            :isPassing.sync="isPassing"
            :showRefresh="true"
            text="请按住滑块拖动"
            successText="验证通过"
            handlerIcon="el-icon-d-arrow-right"
            successIcon="el-icon-circle-check"
            @refresh="refreshImg"
            @passcallback="handleSuccess"
        />
        <div class="VerifyContainer">
            <el-button type="primary" size="mini" @click="handleVerify">验证</el-button>
        </div>
        <VerifyDialog v-model="showDialog" />
        <MacMenu />
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters, mapActions } from 'vuex';
import DragVerifyImg from '@/components/dragImg';
import bgImage from '@/assets/images/sw2.jpg';
import VerifyDialog from '@/components/verifyImg/verifyDialog';
import MacMenu from '@/modules/subAaPage/MacMenu';

let idGlobal = 8;

export default {
    name: 'SubAa',
    data() {
        return {
            controlOnStart: true,
            drag: false,
            list: [
                { name: 'xxxxx', id: 1 },
                { name: 'aaaaa', id: 2 },
                { name: 'bbbbb', id: 3 },
            ],
            dragOptions: {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            },
            isPassing: false,
            img: bgImage,
            showDialog: false,
        }
    },
    computed: {
        ...mapGetters('dragList', ['getList']),
        dragList: {
            get() {
                return this.getList
            },
            set(updateList) {
                // console.log('updateList', updateList)
                this.updateList(updateList)
            },
        },
    },
    components: {
        draggable,
        DragVerifyImg,
        VerifyDialog,
        MacMenu,
    },
    created() {},
    methods: {
        ...mapActions('dragList', ['updateList']),
        refreshImg() {},
        handleSuccess() {},
        clone({ name }) {
            idGlobal += 1
            return ({ name, id: idGlobal })
        },
        pullFunction() {
            return this.controlOnStart ? 'clone' : true;
        },
        start({ originalEvent }) {
            this.drag = true
            this.controlOnStart = originalEvent.ctrlKey;
        },
        handleVerify() {
            this.showDialog = true
        },
    },
}
</script>
<style lang='scss' scoped>
@import "~@/css/common.scss";

.sub-a-container {
    width: 100%;
    .page-container{
        width: 100%;
    }
    .left-container, .right-container{
        width: 200px;
        height: 300px;
        float: left;
        padding: 20px;
        margin-right: 20px;
        .list-group-item{
            height: 30px;
            border: 1px solid black;
            margin-bottom: 10px;
            text-align: center;
            background: white;
            line-height: 30px;
        }
    }

    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
    .list-group {
        min-height: 20px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
}
</style>
