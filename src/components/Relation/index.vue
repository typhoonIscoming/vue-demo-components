<script>
/* eslint-disable no-nested-ternary */
export default {
    name: 'Relation',
    props: {
        type: {
            type: String,
            default: 'line',
            validate(val) {
                // 定义两种样式展示方式
                return ['line', 'connect'].includes(val);
            },
        },
        oIndex: {
            type: Number,
            default: 0,
        },
        value: {
            type: [Boolean, Number],
            default: 1,
        },
    },
    render() {
        const defaultSlots = this.$slots.default || [];
        const children = defaultSlots.filter(item => item.tag); // 排除空白节点
        return <div class='RelationContainer'>
                {
                    [
                        children.length > 1
                        ? this.type === 'line'
                        ? <div class='RelationLine'>
                            <span class='RelationText'
                                {
                                    ...{
                                        on: {
                                            click: () => {
                                                this.$emit('click', { index: this.oIndex })
                                            },
                                        },
                                    }
                                }
                            >
                                { this.value ? '且' : '或' }
                            </span>
                        </div>
                        : <div class='RelationConnect'>
                            <div class='TopLine'></div>
                            <el-button
                                plain
                                size="mini"
                                {
                                    ...{
                                        on: {
                                            click: () => {
                                                this.$emit('click', { index: this.oIndex })
                                            },
                                        },
                                    }
                                }
                            >
                                { this.value ? '且' : '或' }
                            </el-button>
                            <div class='BottomLine'></div>
                        </div>
                        : null,

                        <ul class='RelationContent'>
                            {
                                children.map(item => <li class='RelationItemContainer'>{item}</li>)
                            }
                        </ul>,
                    ]
                }
            </div>
    },
}
</script>
<style lang="scss" scoped>
$LineHeight: 25px;

.RelationContainer{
    display: flex;
    &::before, &::after{
        display: table;
        content: "";
    }
    &::after{
        clear: both;
    }
    .RelationContent{
        margin: 0;
        padding: 0;
        flex: 1;
        zoom: 1;
        background: white;
        z-index: 9;
        .RelationItemContainer{
            list-style: none;
            margin: 10px 0;
            &:first-child{
                margin-top: 0;
            }
            &:last-child{
                margin-bottom: 0;
            }
        }
    }
    .RelationLine{
        position: relative;
        margin-right: 12px;
        &::before{
            content: " ";
            position: absolute;
            top: 0;
            left: 50%;
            width: 2px;
            height: 100%;
            overflow: hidden;
            background: #d6efe8;
        }
    }
    .RelationText{
        position: relative;
        display: block;
        top: 50%;
        left: 0;
        right: 0;
        min-width: 25px;
        height: 25px;
        transform: translateY(-50%);
        border-radius: 3px;
        background: #d6efe8;
        color: #00d166;
        font-size: 14px;
        font-weight: 700;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        width: auto;
        min-width: 20px;
        height: 20px;
        font-size: 13px;
        line-height: 20px;
    }
    .RelationConnect{
        display: flex;
        flex-direction: column;
        .TopLine, .BottomLine{
            width: 100%;
            margin-left: 16px;
            border-left: 1px solid #d3dce6;
            border-radius: 1px;
            position: relative;
            flex-grow: 2;
        }
        .TopLine{
            border-top: 1px solid #d3dce6;
            margin-bottom: $LineHeight;
            top: $LineHeight;
        }
        .BottomLine{
            border-bottom: 1px solid #d3dce6;
            margin-top: $LineHeight;
            bottom: $LineHeight;
        }
        /deep/ .el-button {
            padding: 0;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin-right: 12px;
        }
    }
}
</style>
