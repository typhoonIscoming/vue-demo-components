<template>
    <ValidationProvider name="value" :rule="rules">
        <template slot-scope="{errors}">
            <el-input v-model="bindValue" :placeholder="placeholder" @change="handleChange"></el-input>
            <span>{{ errors && errors[0] }}</span>
        </template>
    </ValidationProvider>
</template>

<script>
import { validate } from 'vee-validate';

export default {
    name: 'Input',
    props: {
        rules: String,
        value: [String, Number, null],
        placeholder: String,
        name: String,
    },
    computed: {
        bindValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
    methods: {
        verify() {
            validate(this.bindValue, this.rules).then((res) => {
                console.log('res', res)
            })
        },
        handleChange() {
            console.log(123)
            this.verify()
        },
    },
}
</script>

<style>

</style>
