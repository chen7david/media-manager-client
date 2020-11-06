<template>
  <div class="home">
    <v-container>
      <VideoPlayer  
        :media="movie" 
        videoBaseURL="http://watch.hopto.org:9000/movies" 
        imgBaseURL="http://aox.hopto.org:8000/image/original"
      />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import VideoPlayer from '@/components/VideoPlayer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    VideoPlayer
  }, 
  computed: {
    ...mapGetters([
      'movie'
    ])
  }
}
</script>
