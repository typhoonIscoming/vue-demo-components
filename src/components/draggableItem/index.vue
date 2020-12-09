
<script>
export default {
    name: 'DraggableItem',
    data() {
        return {}
    },
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    render() {
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
                { this.item.label }
            </div>
        )
    },
    methods: {
        activedItem() {
            this.$emit('activeItem', this.item)
        },
    },
}
</script>
<style lang='scss' scoped>
$theme: #409EFF;

.drawing-draggable-item{
    min-height: 50px;
    padding: 10px 20px;
    box-sizing: border-box;
    line-height: 2;
    background: white;
    border: 2px solid transparent;
    &:hover{
        border: 2px dashed $theme;
    }
}
</style>
