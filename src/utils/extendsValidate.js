import { extend, configure } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

const trimStr = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');
const isMobile = value => trimStr(value).length === 11 && /^1[3456789]\d{9}$/.test(value)


configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    },
});
extend('isMobile', (val) => {
    console.log('val', val)
    if (isMobile(val)) {
        return true
    }
    return '电话格式错误'
})

extend('required', {
    ...required,
    message: 'The {_field_} field must have value',
})
