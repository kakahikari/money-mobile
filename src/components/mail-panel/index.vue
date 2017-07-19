<template lang="pug">
  .mail-panel
    template(v-if="authStatus == 1")
      icon(name="email")
      mt-badge(size="small" type="error" v-if="value > 0 && value < 100") {{ value }}
      mt-badge(size="small" type="error" v-if="value > 99") 99+
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Badge } from 'mint-ui'
  Vue.component(Badge.name, Badge)

  export default {
    name: 'mail-panel',

    data () {
      return {
        interval: {}
      }
    },

    computed: mapState({
      authStatus: state => state.AUTH.status,
      value: state => state.MAIL.list.filter(node => node.status === '0').length
    }),

    created () {
      this.fetch()
      this.interval = window.setInterval(() => {
        this.fetch()
      }, 60000)
    },

    methods: {
      fetch () {
        this.$store.dispatch('fetchMails').catch((err) => {
          if (err !== 'please login first') this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    }
  }
</script>

<style lang="css">
  .mail-panel {
    position: relative;
  }
  .mint-badge {
    position: absolute;
    top: 0;
    right: .3em;
    transform: translate3d(50%, 50%, 0) scale3d(.7, .7, 1);
  }
</style>
