import axios from "axios";
const api = axios.create({
    baseURL:  import.meta.env.VITE_APP_BASE_URL,//"https://freelancework.ir/",
    headers: {
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(function (config) {
    let token = localStorage.getItem('api_token');

    config.headers.Authorization = 'Bearer ' + token;

    return config;
}, (err) => {
    return err
});

api.interceptors.response.use(res => res, err => Promise.reject(err))

export default api;