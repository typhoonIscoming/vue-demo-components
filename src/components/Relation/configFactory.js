// 用户属性
export const initUserAttributeConfig = (initCondition = 0, initMark = 1, initValue = []) => ({
    condition: initCondition,
    mark: initMark,
    value: initValue,
});

// const operatorOptions = [
//     { label: '=', value: 1, mark: 'input' },
//     { label: '≠', value: 2, mark: 'input' },
//     { label: '<', value: 3, mark: 'input' },
//     { label: '≤', value: 4, mark: 'input' },
//     { label: '>', value: 5, mark: 'input' },
//     { label: '≥', value: 6, mark: 'input' },
//     { label: '区间', value: 7, mark: 'between' },
//     { label: 'TOP N', value: 8, mark: 'range' },
// ]
// markValue是operatorOptions中的value
export const initTimesRangeValue = (markValue) => {
    if ([1, 2, 3, 4, 5, 6].includes(markValue)) {
        // 默认值为1
        return { frontValue: 1 }
    } else if (markValue === 7) {
        return { frontValue: null, endValue: null }
    } else if (markValue === 8) {
        // frontValueMark是字典表中的valuePositionOption值
        return { frontValue: null, endValue: null, frontValueMark: 'front', endValueMark: 'ranking' }
    }
    return {}
}
// 用户行为
export const initActionConfig = () => ({
    date: { tag: 1, value: '' }, // 日期值包含了两部分，今日|昨日...，以及具体日期值
    isDone: 'done', // 是否做过
    event: 1, // 做过某件事
    filterCondition: [], // 筛选条件(这里的筛选事件就可以使用 initUserAttributeConfig 来初始化)
    frequency: [1], // 做过的频率
    mark: 6, // 大于等于等等...
    times: { ...initTimesRangeValue(1) }, // 次数(大于、区间、topN三种取值类型)
    relation: 1,
})


// 用户行为依次做过的事件(即initOrderConfig中children中的对象)
export const initOrderEvent = () => ({
    event: 1,
    relation: 1,
    children: [], // 这里的筛选事件就可以使用 initUserAttributeConfig 来初始化
})
// 行为序列
export const initOrderConfig = () => ({
    date: { tag: 1, value: '' }, // 日期值包含了两部分，今日|昨日...，以及具体日期值（2021-12-03先只保存一个字符串）
    // 依次做过的事件(初始化存在两个值，至少两个)
    children: [
        { ...initOrderEvent() },
        { ...initOrderEvent() },
    ],
})

