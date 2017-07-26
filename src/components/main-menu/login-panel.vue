<template lang="pug">
  .login-panel
    template(v-if="authStatus == 1")
      router-link.user-info(":to"="{name: 'My-account'}")
        .username
          icon(name="account_circle")
          span {{ username }}
        .wallet-sum {{ $root.i18n('Balance') }}:&nbsp;
          span {{ walletSum.toString() | currency }}
      mt-button.logout(@click="logout()") {{ $root.i18n('Logout') }}
    template(v-else)
      router-link.no-login(":to"="{name: 'Register'}")
        mt-button.register {{ $root.i18n('Register') }}
      router-link.no-login(":to"="{name: 'Login'}")
        mt-button.login {{ $root.i18n('Login') }}
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Button } from 'mint-ui'
  Vue.component(Button.name, Button)

  export default {
    name: 'login-panel',

    data () {
      return {
        interval: {}
      }
    },

    computed: mapState({
      authStatus: state => state.AUTH.status,
      username: state => state.USER.username,
      walletSum: state => state.WALLET.sum
    }),

    created () {
      this.fetch()
      this.interval = window.setInterval(() => {
        this.fetch()
      }, 60000)
    },

    methods: {
      fetch () {
        this.$store.dispatch('fetchWallets', {context: this}).catch((err) => {
          if (err !== 'please login first') this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      logout () {
        this.$root.logout()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
