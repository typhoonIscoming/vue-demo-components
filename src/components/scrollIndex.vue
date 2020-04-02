<template>
    <div class="enc-scroll-to-index">
        <div class="xh-index-nav">
            <ul
                class="xh-indexlist-navlist"
                @touchstart="onTouchStart"
                @touchmove.prevent="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
            >
                <li
                    v-for="(section, index) in groupList"
                    :key="index"
                    :class="{'selected-index-nav': section === currentIndicator}"
                    class="xh-indexlist-item"
                >
                    {{ section }}
                </li>
            </ul>
        </div>
        <div
            v-if="isMoving"
            class="xh-indexlist-indicator">
            <div class="indicator-mask"></div>
            <div class="current-indicator">{{ currentIndicator }}</div>
        </div>
        <div class="scroll-list-content">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'EncScrollIndex',
    data() {
        return {
            currentIndicator: null,
            navOffsetX: 0,
            isMoving: false,
        }
    },
    props: {
        groupList: {
            type: Array,
            default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
    },
    methods: {
        onTouchStart(ev) {
            this.isMoving = true;
            this.navOffsetX = ev.changedTouches[0].clientX;
            this.scrollList(ev.changedTouches[0].clientY);
        },
        onTouchMove(ev) {
            this.scrollList(ev.changedTouches[0].clientY);
        },
        onTouchEnd() {
            this.isMoving = false;
        },
        scrollList(y) {
            const currentItem = document.elementFromPoint(this.navOffsetX, y);
            if (!currentItem || !currentItem.classList.contains('xh-indexlist-item')) return
            this.currentIndicator = currentItem.innerText;
            // const targets = this.childdrenSections.filter(section => section.oIndex === currentItem.innerText);
        },
    },
}
</script>
<style lang="scss" scoped>
.enc-scroll-to-index{
    height: 100%;
    overflow-y: auto;
    padding: 0 20px;
    position: relative;
    .xh-index-nav{
        position: absolute;
        height: 100%;
        right: 10px;
        .xh-indexlist-navlist{
            li{
                list-style: none;
                text-align: center;
                line-height: 30px;
            }
        }
    }
    .xh-indexlist-indicator{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 80px;
        height: 80px;
        .indicator-mask{
            position: absolute;
            background-color: black;
            opacity: 0.5;
            width: 100%;
            height: 100%;
            z-index: 8;
            border-radius: 10px;
        }
        .current-indicator{
            position: absolute;
            z-index: 9;
            text-align: center;
            width: 100%;
            height: 80px;
            line-height: 80px;
            color: white;
        }
    }
    .scroll-list-content{
        height: 100%;
        overflow-y: auto;
    }
}
</style>
