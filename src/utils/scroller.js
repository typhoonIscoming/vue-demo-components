// 判断是否是window
export const isWindow = (el) => el === window;

// 获取元素的可视区域
export const getVisibleHeight = (el) => {
    if (!el) {
        return 0
    } else if (isWindow(el)) {
        return el.innerHeight;
    }
    return el.getBoundingClientRect().height;
}

// 获取元素到可视区域顶部的距离
export const getVisibleTop = (el) => {
    if (isWindow(el)) {
        return 0;
    }
    return el.getBoundingClientRect().top
}

// 获取到当前子元素滚动到顶部的时候的索引
/**
 * @param {require, elementNode} parentEl 容器
 * @param {可选, number} position 设置元素距离容器顶端多少距离就移动到下一个索引
 * position这个参数就可以设置是否滚动到容器的中间位置就开始移动到下一个索引
 */
export const getCurrentIndexOnScroll = (parentEl, position = 60) => {
    const children = parentEl.children;
    const parentOffsetTop = getVisibleTop(parentEl);
    for (let index = 0; index < children.length; index += 1) {
        // 每一个子元素距离可是区域顶部的距离
        const top = getVisibleTop(children[index]);
        // 每一个子元素相对于父元素顶部的距离
        const relativeTop = top - parentOffsetTop;
        if (relativeTop >= position) {
            return index === 0 ? 0 : index - 1;
        }
    }
    return children.length - 1
}

let prev = Date.now();

function fallback(fn) {
    const curr = Date.now();
    const ms = Math.max(0, 16 - (curr - prev));
    const id = setTimeout(fn, ms);
    prev = curr + ms;
    return id;
}

// 动画器执行者
export const animator = window.requestAnimationFrame || fallback;

export const getScrollTop = (el) => {
    const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
    return Math.max(top, 0);
}

function setScrollTop(el, value) {
    if ('scrollTop' in el) {
        el.scrollTop = value; // eslint-disable-line
    } else {
        el.scrollTo(el.scrollX, value);
    }
}

/**
 * @param {require, elementNode} scroller 容器
 * @param {require, number} to 要滚动到的Y轴位置
 * @param {可选, number} duration 设定滚动时间
 */
// let animateid = null;
export const scrollTopTo = (scroller, to, duration) => {
    // 当前滚动到那个位置
    let current = getScrollTop(scroller)
    const frames = duration === 0 ? 1 : Math.round(duration / 16);
    const step = (to - current) / frames;
    const isDown = current < to;


    function animation() {
        current += step;
        if ((isDown && current > to) || (!isDown && current < to)) {
            current = to;
        }
        // 走一帧
        setScrollTop(scroller, current);
        // requestAnimationFrame不会进行重绘或回流
        if ((isDown && current < to) || (!isDown && current > to)) {
            animator(animation);
        }
    }
    animation()
}

// 点击对应索引的tab，页面滚动到对应子元素的到顶部
/**
 * @param {require, elementNode} scrollEl 容器
 * @param {require, elementNode} parentEl 父元素
 * @param {require, number} index 要滚动到子元素的索引
 * @param {可选, boolean} immediate 是否立刻滚动还是有一个滚动过渡
 */
export const scrollToCurrentContent = (scrollEl, parentEl, index, immediate) => {
    const duration = immediate ? 0 : 300;
    const children = parentEl.children;
    // 要滚动到的那个元素的位置的高度，index = 0时，就滚动到Y = 0的位置
    let scrollHeight = 0;
    for (let n = 0; n < children.length; n += 1) {
        const styles = window.getComputedStyle(children[n])
        if (n < index) {
            // 这里只能是index >= 1的情况
            const marginTop = parseInt(styles.marginTop, 10)
            const marginBottom = parseInt(styles.marginBottom, 10)
            const margin = marginTop + marginBottom;
            // 当前元素的可视区域高度
            const currentItemHeight = getVisibleHeight(children[n])
            // 应该滚动到的高度
            scrollHeight += (currentItemHeight + margin);
        }
    }
    scrollTopTo(scrollEl, scrollHeight, duration)
}

// 中断requestAnimationFrame的执行

// export const stopAnimation = () => {
//     if (!window.cancelAnimationFrame) {
//         window.cancelAnimationFrame = function cancelAnimationFrame(id) {
//             clearTimeout(id);
//         };
//     }
// }
