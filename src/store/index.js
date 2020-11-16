import Vue from 'vue'
import Vuex from 'vuex'
import http from './../plugins/media-api'
// const http =  new Media()
// import http from './../plugins/http'
const dd = (val) => console.log(val)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    shows: [],
    isloading: false
  },
  getters: {
    movies: (state) => state.movies,
    shows: (state) => state.shows,
    isloading: (state) => state.isloading,
  },
  mutations: {
    setMovies: (state, items) => state.movies = items,
    setShows: (state, items) => state.shows = items,
    addMovie: (state, item) => state.movies.unshift(item),
    addShow: (state, item) => state.shows.unshift(item),
    setLoadingTo: (state, boolean) => state.isloading = boolean,
    removeMovie: (state, id) => {
      const item = state.movies.find(i => i.id == id)
      const index = state.movies.indexOf(item)
      state.movies.splice(index,1)
    },
    removeShow: (state, id) => {
      const item = state.shows.find(i => i.id == id)
      const index = state.shows.indexOf(item)
      state.shows.splice(index,1)
    },
  },
  actions: {
    async getMovies({commit}){
      const { data } = await http.movies().get()
      dd({data})
      commit('setMovies', data)
    },
    async getShows({commit}){
      const data = await http.shows().get()
      commit('setShows', data)
    },
  },
  modules: {
  }
})
