<template lang="pug">
  nav.body-nav
    router-link.item(":to"="{name: 'index'}" ":class"="{cn: language === 'cn'}") {{ $root.i18n('Index') }}
    router-link.item(":to"="{name: 'Promotions'}" ":class"="{cn: language === 'cn'}" v-if="checkFunctionEnable('promotions')") {{ $root.i18n('Promotions') }}
    a.item(v-if="serviceLink !== ''" target="blank" ":href"="serviceLink" ":class"="{cn: language === 'cn'}") {{ $root.i18n('Customer Service') }}
    template(v-if="authStatus == 1")
      router-link.item(":to"="{name: 'My-account'}" ":class"="{cn: language === 'cn'}") {{ $root.i18n('My ACC') }}
    template(v-else)
      router-link.item(":to"="{name: 'Login'}" ":class"="{cn: language === 'cn'}") {{ $root.i18n('Login') }}
</template>

<script>
  import { mapState } from 'vuex'
  import { SERVICELINK, SITE_FUNCTIONS } from '@/siteConfig'

  export default {
    name: 'body-nav',

    data () {
      return {
        serviceLink: SERVICELINK,
        siteFunctions: SITE_FUNCTIONS
      }
    },

    computed: mapState({
      authStatus: state => state.AUTH.status,
      language: state => state.USER.language
    }),

    methods: {
      checkFunctionEnable (functionName) {
        let target = this.siteFunctions.filter(node => node.name === functionName)
        if (target.length > 0) return target[0].enable
        return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
