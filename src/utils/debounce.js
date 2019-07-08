function debounce(func, wait = 300, immediate = true) {
    let timeout, args, context, timestamp;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                func.apply(context, args);
            }
        }
    };

    return function() {
        context = this;
        args = arguments
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        // 如果immediate = true, 就立即执行事件，
        if (callNow) func.apply(context, args);
    };
}

export {
    debounce,
}


// 定时器，用来 setTimeout
// var timer
// // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
// return function () {
//     // 保存函数调用时的上下文和参数，传递给 fn
//     var context = this;
//     var args = arguments;
//     // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
//     clearTimeout(timer)
//     // console.log(args)
//     // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
//     // 再过 delay 毫秒就执行 fn
//     timer = setTimeout(function () {
//         fn.apply(context, args)
//     }, delay)
// }