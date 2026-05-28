import axios from 'axios'

const baseUrl = '/api/'

const AxiosRequest = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        
    },
    withCredentials: true
    
})



export default AxiosRequest