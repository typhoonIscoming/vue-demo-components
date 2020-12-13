 <template>
    <div class="table-configure-container common flex-column">
        <div class="panel flex">
            <div class="left-board">
                <template v-for="(item, index) in menu">
                    <div :key="index" class="components-group">
                        <div class="components-title">
                            {{ item.title }}
                        </div>
                        <draggable
                            class="components-draggable"
                            :list="item.children"
                            v-bind="{
                                group: {
                                    name: 'componentsGroup',
                                    pull: 'clone',
                                    put: false,
                                },
                                filter: '.undraggable',
                                choseClass: 'chose-item',
                                dragClass: 'dragClass',
                            }"
                            :clone="cloneComponent"
                            :component-data="getComponentData()"
                            draggable=".components-item"
                            :sort="false"
                        >
                            <template>
                                <div
                                    v-for="(element, listIndex) in item.children"
                                    :key="listIndex"
                                    class="components-item"
                                    :class="{ 'undraggable': !draggableDisabled(element) }"
                                    @click="addComponent(element)"
                                >
                                    <div class="components-body">
                                        {{ element.label }}
                                    </div>
                                    <div class="drop-item" :class="element.componentName">
                                        {{ element.label }}
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </template>
            </div>
            <div class="center-board">
                <div class="board-container">
                    <draggable
                        class="drawing-board"
                        v-model="getDashboradList"
                        v-bind="{ ghostClass: 'ghostClass', animation: 300 }"
                        group="componentsGroup"
                    >
                        <draggableItem
                            v-for="(element, index) in getList"
                            :key="index"
                            :item="element"
                            :oIndex="index"
                            :class="[ getActivedItem.id === element.id ? 'actived-component-item' : '' ]"
                            class="drawing-component-item"
                            @activeItem="activeFormItem"
                            @copyItem="drawingItemCopy"
                            @deleteItem="drawingItemDelete"
                        />
                    </draggable>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="get-list-btn" @click="getData">
                get List
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { baseTableList, mediaList, filledInfo } from '@/configure/tableList'
import { menuItemAuthority } from '@/configure/componentAuthority';

import draggableItem from '../components/draggableItem';
import { componentFactory } from '../configure/draggableFactory'

const componentTypes = baseTableList.concat(mediaList).concat(filledInfo)

export default {
    data() {
        return {
            menu: [
                { title: '基础表单类', children: baseTableList },
                { title: '多媒体类', children: mediaList },
                { title: '填表人信息', children: filledInfo },
            ],
            drawingList: [],
            activeNames: '',
        }
    },
    components: {
        draggable,
        draggableItem,
    },
    computed: {
        ...mapGetters('dragList', ['getList', 'getActivedItem']),
        getDashboradList: {
            get() {
                return this.getList
            },
            set(list) {
                this.updateList(list)
            },
        },
    },
    created() {
        // console.log(this.menu)
    },
    methods: {
        ...mapActions('dragList', ['updateList', 'setActivedItem', 'deleteItem', 'addListItem']),
        cloneComponent(component) {
            const item = componentFactory(component)
            // console.log('cloneComponent', component)
            return { ...item }
        },
        onEnd(component) {
            console.log('onEnd', component)
        },
        addComponent(component) {
            const status = this.draggableDisabled(component)
            if (!status) return
            const len = this.getDashboradList.length;
            const index = this.getDashboradList.findIndex(item => item.id === this.getActivedItem.id)
            const item = componentFactory(component)

            this.addListItem({ item, index: index > -1 ? index : len })
            this.setActivedItem(item)
        },
        activeFormItem(item) {
            this.setActivedItem(item)
        },
        drawingItemCopy(item) {
            console.log('item', item)
        },
        drawingItemDelete(index) {
            this.deleteItem(index)
        },
        getData() {
            console.log('===', this.getList)
        },
        handleChange() {
            // console.log('changed', e);
            // e.item.innerHTML = '<div class="defined-ghost-item" style="background: red;height: 200px;width: 100%;"></div>'
        },
        inputChanged(value) {
            this.activeNames = value;
            // console.log('inputChanged', value)
        },
        getComponentData() {
            return {
                on: {
                    change: this.handleChange,
                    input: this.inputChanged,
                },
                attrs: {
                    wrap: true,
                },
                props: {
                    value: this.activeNames,
                },
            }
        },
        draggableDisabled(obj) {
            const menuItem = componentTypes.find(item => item.componentName === obj.componentName);
            const { authResult } = menuItemAuthority(menuItem, this.getList)
            return authResult
        },
    },
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";
@import "~@/css/draggable.scss";

.table-configure-container{
    .panel{
        width: 100%;
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .footer{
        height: 80px;
    }
    .components-draggable{
        padding: 10px;
        box-sizing: border-box;
        background-color: #fafafa;
    }
    .left-board{
        width: 375px;
        height: 100%;
        overflow-y: auto;
        padding-right: 13px;
        margin-right: 15px;
        box-sizing: border-box;
    }
    .center-board{
        width: 375px;
        height: 100%;
        overflow-x: hidden;
        border: 1px solid #9c9999;
        box-sizing: border-box;
    }
    .board-container{
        height: 100%;
        margin: 0 -15px;
        overflow-y: auto;
    }
}
 </style>
