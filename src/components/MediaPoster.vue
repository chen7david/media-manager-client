<template>
    <v-hover v-slot:default="{ hover }" open-delay="10">
        <v-card class="mb-4" max-width="185px" color="rgb(0, 0, 0, 0.0)" elevation="0" tile> 
                <v-img 
                    :lazy-src="placeHolder" 
                    :src="posterURL" 
                    @error="onImgError()"
                    class="mb-2"
                >
                    <source v-if="imageError"  srcset="/poster-missing.jpg" type="image/jpg"/>
                    <v-overlay absolute :value="hover || isLoading">
                        <v-btn x-large :loading="isLoading" @click="deleteItem(item.id)" v-if="play" icon>
                            <v-icon>mdi-play</v-icon>
                        </v-btn>
                        <v-btn :loading="isLoading" @click="addItem(item.id)" v-if="tmdb && !play" x-large icon>
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn :loading="isLoading" @click="deleteItem(item.id)" v-if="!tmdb && !play" icon>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn v-if="!tmdb && !play" icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn router :to="detailsLink" v-if="!tmdb && !play" icon>
                            <v-icon>mdi-more</v-icon>
                        </v-btn>
                    </v-overlay>
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
      </template>
                </v-img>
            <v-card-subtitle class="text-left pa-0">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <div v-on="on" v-bind="attrs" class="font-weight-medium text-truncate">{{name}}</div>
                    </template>
                    <span>{{name}}</span>
                </v-tooltip>
                <div class="blue-grey--text">{{year}}</div>
            </v-card-subtitle>
        </v-card>
    </v-hover>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PosterCard',
    props: {
        item: null,
        tmdb: null,
        play: null,
    },
    data: () => ({
        isLoading: false,
        imageError: false,
        imageDownloaded: false
    }),
    computed: {
        placeHolder() {
            const canvas = document.createElement("canvas")
            var ctx = canvas.getContext('2d')
            canvas.width = 200
            canvas.height = 300
            ctx.fillStyle= '#990000'
            ctx.fillRect(0,0,canvas.width,canvas.height)
            return canvas.toDataURL()
        },
        name(){
            return this.item.title || this.item.name
        },
        posterURL(){
            const baseURL = this.$config.url.metadata + '/image/'
            const url = this.item.poster_path ? baseURL.concat(this.size, this.item.poster_path) : this.$config.url.defaultPoster
            console.log({item:this.item})
            return this.imageError ?  this.$config.url.defaultPoster : url
        },
        size(){
            return ['w780', 'w500', 'w342', 'w185', 'w154', 'w92'][2]
        },
        width(){
            return this.size.replace('w','').concat('px')
        },
        year(){
            const date = this.item.release_date || this.item.first_air_date
            return date ? new Date(date).getFullYear().toString() : ''
        },
        detailsLink(){
            return  `${this.isMovie ? 'movie' : 'show' }/${this.item.id}`
        },
        rating(){
            return `${this.item.vote_average}`
        },
        isMovie(){
            return this.item.title != null
        },
    },
    methods:{
        ...mapActions([
            'addShowById',
            'addMovieById',
            'removeShowById',
            'removeMovieById',
        ]),
        async addItem(id){
            this.isLoading = true
            this.isMovie ? await this.addMovieById(id) : await this.addShowById(id)
            this.isLoading = false
        },
        async deleteItem(id){
            this.isLoading = true
            this.isMovie ? await this.removeMovieById(id) : await this.removeShowById(id)
            this.isLoading = false
        },
        onImgError(){
            this.imageError = true
            console.log('@image error ...')
        },
    }
}
</script>