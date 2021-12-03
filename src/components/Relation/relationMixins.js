
export default {
    props: {
        config: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isCollapsed: false, // 是否收缩起来
        }
    },
    methods: {
        handleAdd() {
            this.isCollapsed = false;
            // this.initConfig是各个引用了此mixin中的组件的自定义初始化数据的方法
            this.config.children = this.config.children.concat([{ ...this.initConfig() }])
        },
        handleAddChild(type, index) {
            const temp = { ...this.initConfig(), children: [] }
            if (type === 'child') {
                const current = this.config.children[index];
                this.config.children = this.config.children.map((item, i) => {
                    if (i === index) {
                        return { ...current, children: [...current.children, temp] }
                    }
                    return item
                })
            } else {
                const current = this.config.children[index];
                // 变成一个包含子规则的节点，需要加上relation字段来描述子规则的关系
                this.config.children.splice(index, 1, {
                    relation: 1,
                    children: [current, temp],
                })
            }
        },
        handleDelete(type, index, childIndex) {
            if (type === 'child') {
                this.config.children = this.config.children.map((item, i) => {
                    if (i === index) {
                        item.children.splice(childIndex, 1);
                        if (item.children.length === 1) {
                            return { children: [], ...item.children[0] }
                        }
                    }
                    return item
                })
            } else {
                this.config.children.splice(index, 1)
            }
        },
        handleChangeRelation(type, index) {
            // 改变关系
            if (type === 'parent') {
                this.$set(this.config, 'relation', +(!this.config.relation))
            } else {
                this.config.children = this.config.children.map((item, i) => {
                    if (i === index) {
                        return { ...item, relation: +(!item.relation) }
                    }
                    return item
                })
            }
        },
    },
}
