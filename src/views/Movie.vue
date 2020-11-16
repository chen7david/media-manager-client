<template>
  <v-container>
    <v-row fill-height>
      <v-btn icon router to="/movies">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>
      <v-col cols="12">
         <v-row justify="start"> 
            <v-col lg="9" sm="12" xs="12">
              <VideoPlayer 
                :media="item" 
                videoBaseURL="http://aox.hopto.org:9000/movies"
                imgBaseURL="http://aox.hopto.org:8000/image/w1280"
              />
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Details from './../components/Details';
import VideoPlayer from './../components/VideoPlayer';


export default {
  name: 'Movies',

  components: {
    // Details,
    VideoPlayer
  },

  props: {
    id: null
  },

  data: () => ({
    item: {},
  }),

  computed: {

  },
  methods: {
    async getMovie(){
      const { data } = await this.$http.movies().withId(this.id).get()
      this.item = data
      console.log(data)
    }
  },

  async mounted(){
     await this.getMovie()
  }
};
</script>
