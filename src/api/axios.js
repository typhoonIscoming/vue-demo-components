import axios from 'axios'

console.log(' process.env.BASE_API', process.env.BASE_API)

let service = null;

const verify = 'https://captcha.anji-plus.com/captcha-api';

const createInstance = (base = '') => {
    if (!service) {
        base = base || verify;
        service = axios.create({
            baseURL: base,
            timeout: 40000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        service.interceptors.request.use(
            config => config,
            error => Promise.reject(error),
        )
        // response interceptor
        service.interceptors.response.use(
            response => response.data,
            error => error,
        )
    }
    return service
}

export default base => createInstance(base)
