<template>
    <v-card width="720px" height="400px" color="black">
        <video v-if="media" crossorigin="anonymous" :key="media.id" :poster="backdropImg" controls width="100%" height="100%">
            <source :src="video" type="video/mp4">
            video can not be played in this browser.
            <track 
              crossorigin="anonymous"
              v-for="subtitle in media.subtitles" 
              :key="subtitle.lang" 
              :label="sublabel(subtitle.lang)" 
              kind="captions" 
              :srclang="subtitle.lang" 
              :src="subURL(subtitle.src)" 
              default
            >
        </video>
        <v-card-title class="pt-0 mt-0" v-if="media">{{media.title}}</v-card-title>
        <v-card-subtitle v-if="media" class="">{{media.overview}}</v-card-subtitle>
    </v-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    media: null,
    videoBaseURL: null,
    imgBaseURL: null
  },
  computed:{

    video(){
      return this.videoBaseURL + this.media.videos[0].src
    },

    backdropImg(){
      return this.imgBaseURL + this.media.backdrop_path
    }
  },
  methods: {
    sublabel(lang){
      const map = {
        en: 'Ennglish',
        zh: 'Chinese',
        nl: 'Dutch',
        de: 'German',
        fr: 'French',
        sp: 'Spanish'
      }
      return map[lang] || 'unknown'
    }, 
    subURL(url){
      return this.videoBaseURL + url
    }
  }
}
</script>

<style scoped>
video {
  outline: none;
}
</style>
