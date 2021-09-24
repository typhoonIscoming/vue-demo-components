import axiosInstance from './axios';

export default {
    getPicture: params => axiosInstance.post('/captcha/get', params),
}
