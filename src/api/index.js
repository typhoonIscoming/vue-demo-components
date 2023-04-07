import axiosInstance from './axios';

const delivery = 'http://192.168.1.212:8071';

export default {
    getPicture: params => axiosInstance().post('/captcha/get', params),
    test: params => axiosInstance(delivery).post('/cms/sysDicts/type', params, {
        headers: {
            token: '1e5811547d1442b986a0c5d13116fb62',
        },
    }),
    getAddress: () => axiosInstance('https://testapi.jshdata.com/api').get('/espier/address'),
}
