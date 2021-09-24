import axios from 'axios'

console.log(' process.env.BASE_API', process.env.BASE_API)
const service = axios.create({
    baseURL: 'https://captcha.anji-plus.com/captcha-api',
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
export default service
