<template lang="pug">
  section.mails
    .mails-navbar
      .mails-navbar-item(":class"="{active: filter === 'all'}" @click="changeFilter('all')") {{ $root.i18n('All') }}
      .mails-navbar-item(":class"="{active: filter === 'unread'}" @click="changeFilter('unread')") {{ $root.i18n('Unread') }}
      .mails-navbar-item(":class"="{active: filter === 'read'}" @click="changeFilter('read')") {{ $root.i18n('Read') }}
    .mails-content
      template(v-for="node in list")
        node(v-bind="node" @pop="fetch()")
</template>

<script>
  import node from './node'
  import { mapState } from 'vuex'
  import { Indicator } from 'mint-ui'

  export default {
    name: 'mails',

    data () {
      return {
        filter: 'all'
      }
    },

    computed: mapState({
      mailList: function (state) {
        return state.MAIL.list.reverse()
      },
      list: function () {
        let filter = false
        if (this.filter === 'unread') filter = '0'
        if (this.filter === 'read') filter = '1'
        if (filter) return this.mailList.filter(node => node.status === filter)
        else return this.mailList
      }
    }),

    methods: {
      fetch () {
        Indicator.open()
        this.$store.dispatch('fetchMails', {context: this}).then((res) => {
          Indicator.close()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      changeFilter (val) {
        this.filter = val
        this.fetch()
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
