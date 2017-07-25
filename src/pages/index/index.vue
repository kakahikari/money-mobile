<template lang="pug">
  section
    mt-swipe(":auto"="5000" v-if="broadcasts.length > 0")
      template(v-for="node in broadcasts")
        mt-swipe-item(
          ":style"="{ 'background-image': 'url('+node.src+')'}"
        )
    section.game-hall
      template(v-for="node in gameGroup")
        router-link.game-hall__node(":to"="{name: 'Games', query: {groupId: node.id}}") {{ node.text }}
    hotGames(v-bind="hotGames")
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import hotGames from './hot-games'
  import { GAMEGROUP, HOTGAMES } from '@/xhrConfig'
  import { Swipe, SwipeItem } from 'mint-ui'
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

  export default {
    name: 'index',

    data () {
      return {
        adActive: false,
        gameGroup: GAMEGROUP,
        hotGames: HOTGAMES
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
