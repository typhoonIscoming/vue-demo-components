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
        }
    },
}
