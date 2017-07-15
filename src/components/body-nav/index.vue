<template lang="pug">
  nav.body-nav
    router-link.item(":to"="{name: 'index'}" ":class"="{cn: language === 'cn'}") {{ $root.i18n('Index') }}
    router-link.item(":to"="{name: 'Promotions'}" ":class"="{cn: language === 'cn'}") {{ $root.i18n('Promotions') }}
    .item(":class"="{cn: language === 'cn'}") {{ $root.i18n('Customer Service') }}
    .item(":class"="{cn: language === 'cn'}") {{ $root.i18n('My ACC') }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'body-nav',

    computed: mapState({
      language: state => state.USER.language
    })
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
