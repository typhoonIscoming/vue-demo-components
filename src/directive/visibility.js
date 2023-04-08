/**
* author: Tse.hang
* email: hang.xie@huaat.net
* createTime: 2023-04-08 02:44:01
* description:
*/
/* eslint-disable */

import Vue from 'vue';
import { inBrowser } from '@/utils/browser';


export default () => {
    let observer = null;
    Vue.directive('visibility', {
        inserted(el, binding) {
            if (!inBrowser || !window.IntersectionObserver) {
                return;
            }
            console.log('binding', binding)
            const target = document.querySelector(binding.value);
            observer = new IntersectionObserver(
                (entries) => {
                    console.log('entries', entries, entries[0].intersectionRatio > 0)
                },
                { root: target || document.body}
            );
            if (observer) {
                observer.observe(el)
                console.log('el', el.parentElement)
            }
        },
        unbind(el) {
            if (observer) {
                observer.unobserve(el);
            }
        },
    })
}


