import axios from 'axios'

const http = axios.create({
    baseURL: 'aox.hopto.org:9000',
    timeout: 9000
})

export default http