<template lang="pug">
  section.hot-games
    h3.hot-games__legend {{ $root.i18n('Hot Games') }}
    .hot-games__content
      template(v-for="node in list")
        node(v-bind="node" ":groupId"="groupId" @no-blank="gameStart")
    a.no-blank(v-if="gameHref", ":href"="gameHref", target="_blank", @click="gameHref = ''")
      span {{ $root.i18n('Click to start game') }}
</template>

<script>
  import node from '@/components/game-node'
  import { mapState } from 'vuex'

  export default {
    name: 'index__hot-games',

    data () {
      return {
        list: [],
        gameHref: ''
      }
    },

    props: {
      groupName: '',
      groupId: '',
      length: 0
    },

    computed: mapState({
      group: function (state) {
        return state.GAME.group
      },
      language: function (state) {
        return state.USER.language
      }
      // groupName: function () {
      //   let target = this.group.filter(node => node.id === this.groupId)
      //   if (target.length > 0) return target[0].name.toLowerCase()
      //   return ''
      // }
    }),

    watch: {
      group () {
        this.fetch()
      },
      language () {
        this.fetch()
      }
    },

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        if (this.groupName === '') return
        this.$store.dispatch('getSlots', {
          context: this,
          group: this.groupName,
          lang: this.language
        }).then((res) => {
          this.list = res.slice(0, this.length)
        })
      },
      gameStart (res) {
        this.gameHref = res
      }
    },

    components: {
      node
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
