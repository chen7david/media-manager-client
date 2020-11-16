import axios from 'axios'
const dd = (val) => console.log(val)

/* REQUEST HANDLERS */
const requestConfigHandler = async (config) => {
    dd({url:config.url})
    return config
}

const requestErrorHandler = async (error) => {

    return Promise.reject(error)
}

/* RESPONSE HANDLERS */
const responseConfigHandler = async (response) => {
    if(response.data.isCargo) response.data = response.data.payload
    return response;
}

const responseErrorHandler = async (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
}


export default (options = {}) => {
    let config = {
        baseURL: 'http://192.168.50.251:8555',
        timeout: 9000
    }

    Object.assign(config, options)
    const http = axios.create(config)

    http.interceptors.request.use(requestConfigHandler, requestErrorHandler)
    http.interceptors.response.use(responseConfigHandler, responseErrorHandler)

    return http
}