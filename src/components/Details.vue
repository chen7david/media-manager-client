<template>
    <v-row>
        <v-col cols="12">
            <!-- <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="text-h5">{{name}}</v-list-item-title>
                <v-list-item-subtitle class="text-6 blue-grey--text">{{year}}</v-list-item-subtitle>
                
            </v-list-item-content>
            </v-list-item>
            <hr class="my-2 black">
            <v-list-item three-line>
            <v-list-item-content>
                
                <v-list-item-title>{{item.status}}</v-list-item-title>
                <v-list-item-subtitle>
                    {{item.overview}}
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item> -->

            <!-- <v-btn class="ma-2" v-if="!isMovie" :loading="isLoading" @click="refreshSeason">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>

            <v-btn class="ma-2" v-if="!isMovie" :loading="isLoading" @click="addSeason">
                <v-icon>mdi-plus</v-icon>
            </v-btn> -->

            <div v-if="item.seasons">
                <v-tabs v-model="tab" background-color="dark" dark>
                    <v-tab v-for="item in item.seasons" :key="item.season_number">
                            S{{ seasonNumber(item.season_number) }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                <v-tab-item v-for="season in item.seasons" :key="season.id">
                    <v-simple-table width="300px" height="400px">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                
                            </th>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Description
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="episode of season.episodes" 
                                :key="episode.id"
                                @click="select(episode)"
                            >
                                <td>{{ episodeId(episode) }}</td>
                                <td>{{ episode.name }}</td>
                                <td><ReadMore :text="episode.overview" limit="100"/></td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-tab-item>
                </v-tabs-items>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { padStart } from 'lodash'
import ReadMore from './ReadMore'

export default {
    name: 'Details',
    props: {
        item: null,
        tmdb: null,
    },
    components: {
        ReadMore
    },
    data: () => ({
        isLoading: false,
        tab: null,
        seasonTabMap: [],
        item: {}
    }),
    computed: {
        name(){
            return this.isMovie ? this.item.title : this.item.name
        },
        year(){
            const date = this.item.title ? this.item.release_date : this.item.first_air_date
            return date ? new Date(date).getFullYear().toString() : ''
        },
        rating(){
            return `${this.item.vote_average}/10`
        },
        isMovie(){
            return this.item.title != null
        },
    },
    methods:{
        episodeId(episode){
            return `S${padStart(episode.season_number,2, '0')}E${padStart(episode.episode_number,3, '0')}`
        },
        seasonNumber(s){
            return padStart(s,2, '0')
        },
        getSeasonNumber(tab){
            if(!tab == null) return '0'
            return this.item.seasons[tab].season_number
        },
        async refreshSeason(){
            let s = this.getSeasonNumber(this.tab)
            this.isLoading = true
            await this.$mttp.shows().withId(this.item.id).season(new String(s)).update()
            this.isLoading = false
        },
        async updateSeason(s){
            this.isLoading = true
            await this.$mttp.shows().withId(this.item.id).season(new String(s)).update()
            this.isLoading = false
        },
        async addSeason(){
            let s = this.getSeasonNumber(this.tab)
            await this.updateSeason(s + 1)
        },
        select(item){
            this.$emit('selectVideo', item)
        }
    },
}
</script>