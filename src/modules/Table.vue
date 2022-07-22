<script>
export default {
    name: 'Table',
    data() {
        return {
            list: [
                { prop: 'id', label: 'ID' },
                { prop: 'name', label: '姓名' },
            ],
        }
    },
    render() {
        console.log('===', this.$scopedSlots);
        const list = this.list;
        return <div>
            {
                list.map((item, index) => {
                    const isPropSlot = this.$scopedSlots[item.prop];
                    if (isPropSlot) {
                        return <slot name="id">{item.label}</slot>
                    }
                    return <div>{index}</div>
                })
            }
        </div>
    },
}
</script>

<style>

</style>
