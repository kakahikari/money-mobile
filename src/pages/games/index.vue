<template lang="pug">
  section.games
    balance-bar(":balance"="balance" v-if="authStatus == 1")
    .games-navbar
      template(v-for="node in gameGroup")
        .games-navbar-item(
          ":class"="{active: selectGroup.name === node.name.toLowerCase()}"
          @click="changeGroup(node.id)"
        ) {{ node.text }}
    .games-content
      template(v-for="node in list")
        node(v-bind="node" ":groupId"="selectGroup.id" @no-blank="gameStart")
    a.no-blank(v-if="gameHref", ":href"="gameHref", target="_blank", @click="gameHref = ''")
      span {{ $root.i18n('Click to start game') }}
</template>

<script>
  import node from '@/components/game-node'
  import balanceBar from './balance-bar'
  import { mapState } from 'vuex'
  import { GAMEGROUP } from '@/xhrConfig'
  import { Indicator } from 'mint-ui'

  export default {
    name: 'games',

    data () {
      return {
        gameGroup: GAMEGROUP,
        selectGroup: {
          name: '',
          id: ''
        },
        list: [],
        gameHref: ''
      }
    },

    computed: mapState({
      group: function (state) {
        return state.GAME.group
      },
      language: function (state) {
        return state.USER.language
      },
      balance: function (state) {
        var target = state.WALLET.details.filter(node => node.id === this.selectGroup.id)
        if (target.length > 0) return target[0].balance
        return 0
      },
      authStatus: state => state.AUTH.status
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
        // check group fetched
        if (this.group.length > 0) {
          this.selectGroup.id = this.$route.query.groupId || this.gameGroup[0].id
          this.selectGroup.name = this.gameGroup.filter(node => node.id === this.selectGroup.id)[0].name.toLowerCase()
        } else return
        // check group state
        let target = this.group.filter(node => node.id === this.selectGroup.id)[0]
        if (target.status === '0') return this.$root.showToast({type: 'warning', content: target.message})
        Indicator.open()

        this.$store.dispatch('getSlots', {
          context: this,
          group: this.selectGroup.name,
          lang: this.language
        }).then((res) => {
          Indicator.close()
          this.list = res
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      changeGroup (val) {
        this.$router.push({ query: { groupId: val } })
        this.fetch()
      },
      gameStart (res) {
        this.gameHref = res
      }
    },

    components: {
      node,
      balanceBar
    }
  }
</script>

<style lang="scss" scoped>
  @import './style';
</style>
