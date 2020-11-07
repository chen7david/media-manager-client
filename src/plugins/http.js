import axios from 'axios'

const http = axios.create({
    baseURL: 'aox.hopto.org:9000',
    timeout: 9000
})

async function requestHandler(config){

    return config
}

async function requestHandler(error){

    return Promise.reject(error)
}

async function responseHandler(respose){
    if (response.config.parse) {
        //perform the manipulation here and change the response object
    }
    return response;
}

async function responseError(error){
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
}

http.interceptors.request.use(requestHandler, requestError)
http.interceptors.response.use(responseHandler, responseError)


export default http