export default {
    data() {
        return {
            conditionOptions: [
                { label: '青铜', value: 0 },
                { label: '白银', value: 1 },
                { label: '黄金', value: 2 },
            ],
            operationOptions: [
                { label: '等于', value: 1, mark: 'select' },
                { label: '不等于', value: 2, mark: 'select' },
                { label: '包含', value: 3, mark: 'input' },
                { label: '不包含', value: 4, mark: 'input' },
                { label: '有值', value: 5, mark: 'none' },
                { label: '没值', value: 6, mark: 'none' },
                { label: '为空', value: 7, mark: 'none' },
                { label: '不为空', value: 8, mark: 'none' },
                { label: '正则匹配', value: 9, mark: 'input' },
                { label: '正则不匹配', value: 10, mark: 'input' },
            ],
            valueOptions: [
                { value: 'HTML', label: 'HTML' },
                { value: 'CSS', label: 'CSS' },
                { value: 'JavaScript', label: 'JavaScript' },
            ],
            // 是否做过
            hasDoneList: [
                { value: 'done', label: '做过' },
                { value: 'notDone', label: '未做过' },
            ],
            // 符号列表(=, >=, !=。。。)
            operatorOptions: [
                { label: '=', value: 1, mark: 'input' },
                { label: '≠', value: 2, mark: 'input' },
                { label: '<', value: 3, mark: 'input' },
                { label: '≤', value: 4, mark: 'input' },
                { label: '>', value: 5, mark: 'input' },
                { label: '≥', value: 6, mark: 'input' },
                { label: '区间', value: 7, mark: 'between' },
                { label: 'TOP N', value: 8, mark: 'range' },
            ],
            // 事件类型,frequencyList就是当前选项下频率的下拉选择被允许的选项
            somethingOptions: [
                { label: '搜索点击', value: 1, frequencyList: [1, 2, 3, 4, 5, 6] },
                { label: '搜索结果点击', value: 2, frequencyList: [1, 2, 3, 4, 5, 6] },
                { label: '点击行为', value: 3, frequencyList: [1, 2] },
                { label: '商品列表页面浏览', value: 4, frequencyList: [1, 2, 3, 4, 5, 6] },
                { label: 'App推送点击', value: 5, frequencyList: [1, 2] },
                { label: '消息同步终态信息', value: 6, frequencyList: [1, 2] },
                { label: '弹窗展示', value: 7, frequencyList: [1, 2] },
                { label: 'App崩溃', value: 8, frequencyList: [1, 2, 3, 4] },
                { label: '领取权益', value: 9, frequencyList: [1, 2, 3, 4, 5, 6] },
            ],
            frequencyConditionOptions: [
                { label: '总次数', value: 1 },
                { label: '分布', value: 2 },
                {
                    label: '停留时长',
                    value: 3,
                    children: [
                        { label: '总和', value: 1 },
                        { label: '均值', value: 2 },
                        { label: '最大值', value: 3 },
                        { label: '最小值', value: 4 },
                    ],
                },
                {
                    label: '分享时的层级',
                    value: 4,
                    children: [
                        { label: '总和', value: 1 },
                        { label: '均值', value: 2 },
                        { label: '最大值', value: 3 },
                        { label: '最小值', value: 4 },
                    ],
                },
                {
                    label: '屏幕宽度，例如1080',
                    value: 5,
                    children: [
                        { label: '总和', value: 1 },
                        { label: '均值', value: 2 },
                        { label: '最大值', value: 3 },
                        { label: '最小值', value: 4 },
                    ],
                },
                {
                    label: '屏幕高度，例如1920',
                    value: 6,
                    children: [
                        { label: '总和', value: 1 },
                        { label: '均值', value: 2 },
                        { label: '最大值', value: 3 },
                        { label: '最小值', value: 4 },
                    ],
                },
            ],
            // valuePosition
            // 值的范围列表
            valuePositionOptions: [
                { value: 'front', label: '前' },
                { value: 'end', label: '后' },
                { value: 'range', label: '区间' },
            ],
            // 最后一个值的类型
            endValueOptions: [
                { value: 'ranking', label: '名' },
                { value: 'percent', label: '百分比' },
            ],
        }
    },
}
