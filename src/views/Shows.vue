<template>
  <v-container>
    <v-row fill-height>
      <v-col cols="12">
         <v-row justify="space-around">
            <MediaPoster 
              v-for="item in shows"
              :key="item.id" 
              :item="item"
            />
            <!-- <div
              v-for="item in shows"
              :key="item.id" 
              :item="item"
            >
              {{item}}
            </div> -->
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MediaPoster from './../components/MediaPoster';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Shows',

  components: {
    MediaPoster,
  },

  data: () => ({
    items: [],
  }),
  computed: {
    ...mapGetters([
      'shows'
    ])
  },
  methods: {
    ...mapActions([
      'getShows'
    ]),
  },
  async mounted(){
    await this.getShows()
  }
};
</script>
