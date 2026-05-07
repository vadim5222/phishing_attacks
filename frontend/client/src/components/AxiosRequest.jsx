import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosRequest = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type':'application/json',
        accept: 'application/json'
    },
    
})

AxiosRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export default AxiosRequest