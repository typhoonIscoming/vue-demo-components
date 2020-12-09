 <template>
    <div class="table-configure-container common">
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
                            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                            :clone="cloneComponent"
                            draggable=".components-item"
                            :sort="false"
                            @end="onEnd"
                        >
                            <div
                                v-for="(element, listIndex) in item.children"
                                :key="listIndex"
                                class="components-item"
                                @click="addComponent(element)"
                            >
                                <div class="components-body">
                                    {{ element.label }}
                                </div>
                            </div>
                        </draggable>
                    </div>
                </template>
            </div>
            <div class="center-board">
                <draggable
                    class="drawing-board"
                    :list="drawingList"
                    :animation="340"
                    group="componentsGroup"
                >
                    <draggableItem
                        v-for="(element, index) in drawingList"
                        :key="index"
                        :drawing-list="drawingList"
                        :active-id="activeId"
                        :item="element"
                        @activeItem="activeFormItem"
                        @copyItem="drawingItemCopy"
                        @deleteItem="drawingItemDelete"
                    />
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { baseTableList, mediaList, filledInfo } from '@/configure/tableList'
import draggableItem from '../components/draggableItem';

export default {
    data() {
        return {
            menu: [
                { title: '基础表单类', children: baseTableList },
                { title: '多媒体类', children: mediaList },
                { title: '填表人信息', children: filledInfo },
            ],
            drawingList: [],
            activeId: null,
        }
    },
    components: {
        draggable,
        draggableItem,
    },
    created() {
        console.log(this.menu)
    },
    methods: {
        cloneComponent(component) {
            console.log('cloneComponent', component)
            return component
        },
        onEnd(component) {
            console.log('onEnd', component)
        },
        addComponent(component) {
            console.log('component', component)
            this.drawingList.push(component)
        },
        activeFormItem(item) {
            console.log('item', item)
        },
        drawingItemCopy(item) {
            console.log('item', item)
        },
        drawingItemDelete(item) {
            console.log('item', item)
        },
    },
}
</script>

<style scoped lang="scss">
@import "~@/css/common.scss";

.table-configure-container{
    width: 100%;
    .panel{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    }
    .components-group{
        border: 1px solid black;
        margin-bottom: 20px;
        .components-title{
            text-align: center;
        }
        .components-draggable{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            grid-gap: 20px;
        }
        .components-item{
            text-align: center;
            line-height: 25px;
        }
    }
    .left-board{
        width: 375px;
    }
    .center-board{
        flex: 1;
        margin-left: 20px;
        border: 1px solid black;
        .drawing-board{
            width: 100%;
            height: 100%;
        }
    }
}
 </style>
