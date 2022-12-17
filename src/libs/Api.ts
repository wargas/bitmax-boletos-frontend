import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

Api.interceptors.request.use(config => {

    try {
        const token = JSON.parse(localStorage.getItem('auth_token') as string);

        if(token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }

    } catch (error) {
        console.log(error)
    }

    return config
}, error => {
    return new Error(error)
})

export default Api;
