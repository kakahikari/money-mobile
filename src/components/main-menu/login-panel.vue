<template lang="pug">
  .login-panel
    template(v-if="authStatus == 1")
      .user-info
        .username {{ $root.i18n('Account') }}:&nbsp;
          span {{ username }}
        .wallet-sum {{ $root.i18n('Balance') }}:&nbsp;
          span {{ walletSum.toString() | currency }}
      mt-button(@click="logout()") {{ $root.i18n('Logout') }}
    template(v-else)
      router-link(":to"="{name: 'Register'}")
        mt-button {{ $root.i18n('Register') }}
      router-link(":to"="{name: 'Login'}")
        mt-button {{ $root.i18n('Login') }}
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Button } from 'mint-ui'
  Vue.component(Button.name, Button)

  export default {
    name: 'login-panel',

    computed: mapState({
      authStatus: state => state.AUTH.status,
      username: state => state.USER.username,
      walletSum: state => state.WALLET.sum
    }),

    created () {
      this.$store.dispatch('fetchWallets', {context: this}).catch((err) => {
        this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
      })
    },

    methods: {
      logout () {
        this.$root.logout()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
