<template>
  <v-container>
    <v-row fill-height>
      <v-col cols="12">
         <v-row justify="space-around">
            <MediaPoster 
              v-for="item in movies"
              :key="item.id" 
              :item="item"
            />
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MediaPoster from './../components/MediaPoster';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Movies',

  components: {
    MediaPoster,
  },

  data: () => ({
    items: [],
  }),
  computed: {
    ...mapGetters([
      'movies'
    ])
  },
  methods: {
    ...mapActions([
      'getMovies'
    ]),
  },

  async mounted(){
     await this.getMovies()
  }
};
</script>
