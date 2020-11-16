<template>
  <v-container>
    <v-row fill-height>
      <v-btn icon router to="/shows">
          <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-col cols="12">
         <v-row justify="start">
            <VideoPlayer
                  :media="episode"
                  videoBaseURL="http://aox.hopto.org:9000/shows"
                  imgBaseURL="http://aox.hopto.org:8000/image/w1280"
            />
         </v-row>
         <v-row justify="start">
            <v-col class="" lg="8" xs="12">
              <Details v-on:selectVideo="setVideo($event)" :item="item"/>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Details from './../components/Details'
import VideoPlayer from './../components/VideoPlayer'
import { mapGetters } from 'vuex'

export default {
  name: 'Movies',

  components: {
    Details,
    VideoPlayer
  },

  props: {
    id: null
  },

  data: () => ({
    item: {},
    episode: {}
  }),

  computed: {
    ...mapGetters([
      'show'
    ])
  },
  methods: {
    async getShow(){
      const { data } = await this.$http.shows().withId(this.id).get()
      this.item = data
    },
    setVideo(item){
      this.episode = item
      console.log({item})
    },
    setFirstEpisode(){
      this.episode = this.show
      console.log({rrs:this.episode})
    }
  },

  async mounted(){
     await this.getShow()
     await this.setFirstEpisode()
  }
};
</script>
