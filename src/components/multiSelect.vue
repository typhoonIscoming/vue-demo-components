<template>
    <div class="list-contaiber">
        <div v-if="optionList.length > 0">
            <div
                class="list-item"
                v-for="(item, index) in optionList"
                :key="index">
                <p
                    :class="{ active: isSelected(item.id) }"
                    class="c-family-name"
                    @click="select(item)">
                    <span />{{ item.name }}
                </p>
                <span class="c-family-relation">{{ item.relation }}</span>
                <span class="c-family-mobile">{{ item.mobile }}</span>
            </div>
        </div>
        <input
            v-model="dataValue"
            type="hidden" />
    </div>
</template>
<script>
import { find, filter } from 'lodash'

export default {
    name: 'MultiSelect',
    data() {
        return {
            dataValue: [],
        }
    },
    props: {
        optionList: {
            type: Array,
            default: () => [],
        },
        isSingle: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        select(list) {
            if (!(filter(this.dataValue, item => item.id === list.id).length > 0)) {
                if (this.isSingle) {
                    this.dataValue = [list]
                } else {
                    this.dataValue = [...this.dataValue, list]
                }
            } else {
                let oIndex
                this.dataValue.map((item, index) => {
                    if (item.id === list.id) {
                        oIndex = index
                    }
                    return item
                })
                this.dataValue.splice(oindex, 1)
            }
            this.$emit('input', this.dataValue)
        },
        isSelected(id) {
            return find(this.dataValue, item => item.id === id)
        },
    },
}
</script>
<style lang="scss" scoped>
.list-contaiber{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    min-height: 50px;
    max-height: 300px;
    .list-item{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        .c-family-name{
            width: 30px;
            height: 100%;
        }
    }
}
</style>
