<template lang="pug">
  section
    mt-swipe(":auto"="5000" v-if="broadcasts.length > 0")
      template(v-for="node in broadcasts")
        mt-swipe-item(
          ":style"="{ 'background-image': 'url('+node.src+')'}"
        )
    section.game-hall
      template(v-for="node in gameGroup")
        router-link.game-hall__node(
          ":to"="{name: 'Games', query: {groupId: node.id}}"
          ":class"="{ CQ9: node.text === 'CQ9', MG: node.text === 'MG', BBIN: node.text === 'BBIN' }"
        ) {{ node.text }}
    hotGames(v-bind="hotGames")
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import hotGames from './hot-games'
  import { GAME_GROUP, HOT_GAMES } from '@/siteConfig'
  import { Swipe, SwipeItem } from 'mint-ui'
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

  export default {
    name: 'index',

    data () {
      return {
        adActive: false,
        gameGroup: GAME_GROUP,
        hotGames: HOT_GAMES
      }
    },

    computed: mapState({
      broadcasts: state => state.PROMOTE.broadcasts
    }),

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        this.$store.dispatch('getBroadcasts', {context: this}).catch((err) => {
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    },

    components: {
      hotGames,
      Swipe,
      SwipeItem
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
