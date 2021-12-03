// 用户属性
export const initUserAttributeConfig = (initCondition = 0, initMark = 1, initValue = []) => ({
    condition: initCondition,
    mark: initMark,
    value: initValue,
});

// 用户行为
export const initActionConfig = () => ({
    date: { tag: 1, value: '' }, // 日期值包含了两部分，今日|昨日...，以及具体日期值
    isDone: 'done', // 是否做过
    event: 1, // 做过某件事
    children: [], // 筛选条件(这里的筛选事件就可以使用 initUserAttributeConfig 来初始化)
    frequency: [], // 做过的频率
    mark: 1, // 大于等于等等...
    times: {}, // 次数(大于、区间、topN三种取值类型)
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

