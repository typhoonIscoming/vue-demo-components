
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { menuItemAuthority } from '@/configure/componentAuthority';
import { baseTableList, mediaList, filledInfo } from '@/configure/tableList'
import RenderItem from '@/dragComponents'

Vue.use(RenderItem)

const componentTypes = baseTableList.concat(mediaList).concat(filledInfo)

export default {
    name: 'DraggableItem',
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        oIndex: {
            type: Number,
            default: 0,
        },
    },
    render(h) {
        const { componentName: tag } = this.item
        return (
            <div
                class="drawing-draggable-item"
                {
                    ...{
                        on: {
                            click: this.activedItem,
                        },
                    }
                }
            >
                { h(tag, { props: { obj: this.item } }) }
                { this.copyComtent(this.item) }
            </div>
        )
    },
    methods: {
        activedItem() {
            this.$emit('activeItem', this.item)
        },
        copyComtent(obj) {
            const menuItem = componentTypes.find(item => item.componentName === obj.componentName);
            const { authResult } = menuItemAuthority(menuItem, this.getList)

            return (
                <div class="drawing-operator-container">
                    {
                        [
                            authResult ?
                            <span
                                class="drawing-item-copy"
                                title="复制"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    this.$emit('copyItem', obj, this.oIndex)
                                }}
                            >
                                复制
                            </span> : null,
                            <span
                                class="drawing-item-delete"
                                title="删除"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    this.$emit('deleteItem', this.oIndex)
                                }}
                            >
                                删除
                            </span>,
                        ]
                    }
                </div>
            )
        },
    },
    computed: {
        ...mapGetters('dragList', ['getList']),
    },
}
</script>
<style lang='scss' scoped>
$theme: #409EFF;

.drawing-draggable-item{
    min-height: 50px;
    padding: 10px;
    box-sizing: border-box;
    line-height: 2;
    background: white;
    border: 2px solid transparent;
    position: relative;
    &:hover{
        border: 2px dashed $theme;
        .drawing-operator-container{
            display: block;
        }
    }
    .drawing-operator-container{
        display: none;
        position: absolute;
        right: 5px;
        top: 5px;
        background-color: white;
        padding: 0 5px;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: 0 0px 6px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        .drawing-item-copy{
            margin-right: 5px;
        }
        .drawing-item-copy, .drawing-item-delete{
            cursor: pointer;
            &:hover{
                color: $theme;
            }
        }
    }
}
</style>
