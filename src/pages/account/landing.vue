<template lang="pug">
  section.account
    section
      h3 {{ $root.i18n('Wallet center') }}
      mt-cell(":title"="$root.i18n('Transfer')" is-link)
        icon(slot="icon" name="compare_arrows")
      mt-cell(":title"="$root.i18n('Deposit')" is-link)
        icon(slot="icon" name="input")
      mt-cell(":title"="$root.i18n('Withdraw')" is-link)
        icon(slot="icon" name="attach_money")
      mt-cell(":title"="$root.i18n('Linking bank card')" is-link)
        icon(slot="icon" name="credit_card")
      mt-cell(":title"="$root.i18n('History')" is-link)
        icon(slot="icon" name="history")
    section
      h3 {{ $root.i18n('Security settings') }}
      mt-cell(":title"="$root.i18n('Edit profile')" is-link ":to"="{name: 'Edit-profile'}")
        icon(slot="icon" name="edit")
      mt-cell(":title"="$root.i18n('Edit account password')" is-link)
        icon(slot="icon" name="lock")
      mt-cell(":title"="$root.i18n('Edit withdraw password')" is-link)
        icon(slot="icon" name="attach_money")
    section
      div(@click="logout()")
        mt-cell(":title"="$root.i18n('Logout')" is-link)
          icon(slot="icon" name="power_settings_new")
</template>

<script>
  import Vue from 'vue'
  import { Cell } from 'mint-ui'
  Vue.component(Cell.name, Cell)

  export default {
    name: 'account__landing',

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
