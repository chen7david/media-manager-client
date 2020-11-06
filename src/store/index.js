import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movie:{
      "id": 299537,
      "keyphrase": "captain marvel",
      "title": "Captain Marvel",
      "original_title": "Captain Marvel",
      "poster_path": "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
      "backdrop_path": "/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
      "original_language": "en",
      "overview": "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
      "vote_average": "7",
      "popularity": "112.02",
      "vote_count": "10278",
      "release_date": "2019-03-06",
      "status": "Released",
      "tagline": "Higher. Further. Faster.",
      "adult": false,
      "genres": [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 12,
            "name": "Adventure"
          },
          {
            "id": 878,
            "name": "Science Fiction"
          }
        ],
        "videos": [
            {
              // "src": "/Captain Marvel (2019)/Captain Marvel.mp4"
              "src": "/Finding Nemo (2003)/Finding Nemo.mp4"
            }
        ],
        "subtitles": [
            {
              "lang": "en",
              "src": "/Captain Marvel (2019)/Captain Marvel.en.vtt"
            },
            {
              "lang": "zh",
              "src": "/Captain Marvel (2019)/Captain Marvel.zh.vtt"
            }
        ]
      }
  },
  getters: {
    movie: (state) => state.movie
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
