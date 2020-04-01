<template>
    <div class="enc-scroll-to-index">
        <div class="xh-index-nav">
            <ul class="xh-indexlist-navlist">
                <li
                    v-for="(section, index) in groupList"
                    :key="index"
                    :class="{'selected-index-nav': section === currentIndicator}"
                >
                    {{ section }}
                </li>
            </ul>
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
        }
    },
    props: {
        groupList: {
            type: Array,
            default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
    },
    methods: {

    },
}
</script>
<style lang="scss" scoped>
.enc-scroll-to-index{

}
</style>
