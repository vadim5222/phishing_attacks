import axios from 'axios'

const baseUrl = 'http://localhost:8000/'

const AxiosRequest = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json',
        
    },
    withCredentials: true
    
})


export default AxiosRequest