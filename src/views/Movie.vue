<template>
  <v-container>
    <v-row fill-height>
      <v-btn icon router to="/movies">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>
      <v-col cols="12">
         <v-row justify="start"> 
            <v-col lg="9" sm="12" xs="12">
              <Details :item="item"/>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Details from './../components/Details';


export default {
  name: 'Movies',

  components: {
    Details
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
      this.item = await this.$mttp.movies().withId(this.id).get()
      console.log(this.item)
    }
  },

  async mounted(){
     await this.getMovie()
  }
};
</script>
