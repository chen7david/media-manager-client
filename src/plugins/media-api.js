const dd = (val) => console.log(val)
// const http = require('./http')()
import api from './http'

class MediaAPI {
    constructor(http){
        this.http = http
        this.state = {bits:[], params:{}}
    }

    clearState(){
        this.state = {bits:[], params:{}}
    }

    url(){
        const {source, action, bits, params} = this.state
        let url = bits.filter(e => e).join('/')
        if(source) url = [source, url].join('-')
        if(action) url = [url, action].join('-')
        const qString = this.toQueryString(params)
        if(qString) url = [url, qString].join('?')
        this.clearState()
        return '/' + url
    }

    tmdb(){
        this.state.source = 'tmdb'
        return this
    }

    movies(){
        this.state.bits.push('movies')
        return this
    }

    shows(){
        this.state.bits.push('shows')
        return this
    }

    people(){
        this.state.bits.push('people')
        return this
    }

    season(id){
        this.state.bits.push('season')
        this.state.bits.push(id)
        return this
    }

    graph(){
        this.state.action = 'graph'
        return this
    }

    import(){
        this.state.action = 'import'
        return this
    }

    withId(id){
        this.state.bits.push(id)
        return this
    }

    async genres(params = {}){
        params.type = this.state.bits.pop()
        this.state.bits.push('genres')
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async trending(params = {}){
        params.type = this.state.bits.pop()
        this.state.bits.push('trending')
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async search(name, params = {}){
        params.search = name
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async fixdata(params = {}){
        this.state.bits.push('fix-metadata')
        Object.assign(this.state.params, params)
        return await this.get()
    }

    async get(){
        dd({url:this.url})
        return await this.http.get(this.url())
    }

    async update(){
        return await this.http.patch(this.url())
    }

    async delete(){
        return await this.http.delete(this.url())
    }

    toQueryString(params = {}){
        return Object.keys(Object.assign(params, this.state.params))
            .map(key => key + '=' + params[key]).join('&')
    }
}


export default new MediaAPI(api())
