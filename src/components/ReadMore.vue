<template>
    <span>
        <div v-if="readmore">
            {{text}}
        </div>
        <div v-else>
            {{limitDisplayLength()}}
        </div>
        <a v-if="isTooLong" @click="readmore = !readmore">{{readmore ? 'collapse' : 'read more ...'}}</a>
    </span>
</template>

<script>
export default {
    name: 'ReadMore',
    props: {
        limit: null,
        text: null,
    },
    data: () => ({
        readmore: false
    }),
    computed: {
        isTooLong(){
            return this.text.length > this.limit
        },
    },
    methods:{
        limitDisplayLength(){
            return this.text.substring(0,this.limit)
        }
    }
}
</script>