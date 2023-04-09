/* eslint-disable */
import Vue from "vue";
import { createComponent, createBEM } from './components';

export const inBrowser = typeof window !== "undefined";
export const inWeex =
    typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
export const isEdge = UA && UA.indexOf("edge/") > 0;
export const isAndroid =
    (UA && UA.indexOf("android") > 0) || weexPlatform === "android";
export const isIOS =
    (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === "ios";
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

export const isServer = Vue.prototype.$isServer;
export let supportsPassive = false;

if (!isServer) {
    try {
        const opts = {};
        Object.defineProperty(opts, "passive", {
            // eslint-disable-next-line getter-return
            get() {
                /* istanbul ignore next */
                supportsPassive = true;
            }
        });
        window.addEventListener("test-passive", null, opts);
        // eslint-disable-next-line no-empty
    } catch (e) {}
}

export const isWindow = val => val === window;

export function on(target, event, handler, passive = false) {
    if (!isServer) {
        // console.log('target', target)
        target.addEventListener(
            event,
            handler,
            supportsPassive ? { capture: false, passive } : false
        );
    }
}

export function off(target, event, handler) {
    if (!isServer) {
        target.removeEventListener(event, handler);
    }
}
let uid = 0;
export function BindEventMixin(handler) {
    const key = `binded_${uid++}`;
    function bind() {
        if (!this[key]) {
            handler.call(this, on, true);
            this[key] = true;
        }
    }
    function unbind() {
        if (this[key]) {
            handler.call(this, off, false);
            this[key] = false;
        }
    }
    return {
        mounted: bind,
        activated: bind,
        deactivated: unbind,
        beforeDestroy: unbind
    };
}

export const isDef = val => val !== undefined && val !== null;

export function isHidden(el) {
    const style = window.getComputedStyle(el);
    const hidden = style.display === "none";

    // offsetParent returns null in the following situations:
    // 1. The element or its parent element has the display property set to none.
    // 2. The element has the position property set to fixed
    const parentHidden = el.offsetParent === null && style.position !== "fixed";

    return hidden || parentHidden;
}
const overflowScrollReg = /scroll|auto|overlay/i;
export function getScroller(el, root = window) {
    let node = el;
    while (
        node &&
        node.tagName !== "HTML" &&
        node.tagName !== "BODY" &&
        node.nodeType === 1 &&
        node !== root
    ) {
        const { overflowY } = window.getComputedStyle(node);
        if (overflowScrollReg.test(overflowY)) {
            return node;
        }
        node = node.parentNode;
    }

    return root;
}

export function getElementTop(el, scroller) {
    if (isWindow(el)) {
        return 0;
    }

    const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
    return el.getBoundingClientRect().top + scrollTop;
}

export function getScrollTop(el) {
    const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;

    // iOS scroll bounce cause minus scrollTop
    return Math.max(top, 0);
}

export function setScrollTop(el, value) {
    if ("scrollTop" in el) {
        el.scrollTop = value;
    } else {
        el.scrollTo(el.scrollX, value);
    }
}

export function getRootScrollTop() {
    return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
}

export function setRootScrollTop(value) {
    setScrollTop(window, value);
    setScrollTop(document.body, value);
}

export function getVisibleHeight(el) {
    if (isWindow(el)) {
        return el.innerHeight;
    }
    return el.getBoundingClientRect().height;
}

export function getVisibleTop(el) {
    if (isWindow(el)) {
        return 0;
    }
    return el.getBoundingClientRect().top;
}


export function createNamespace(name) {
    name = 'van-' + name;
    return [createComponent(name), createBEM(name)];
}
