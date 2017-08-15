<template lang="pug">
  section.main-menu
    button.close-button(@click="close()")
      icon(name="close" slot="icon")
    button.translate-button(v-if="siteLanguages.length > 1" @click="translateBtnClick()")
      icon(name="language" slot="icon")
    login-panel
    nav
      router-link(":to"="{name: 'index'}")
        mt-cell(":title"="$root.i18n('Index')")
          icon(name="home")
      router-link(":to"="{name: 'Games'}" v-if="checkFunctionEnable('games')")
        mt-cell(":title"="$root.i18n('Games')")
      router-link(":to"="{name: 'Promotions'}" v-if="checkFunctionEnable('promotions')")
        mt-cell(":title"="$root.i18n('Promotions')")
      a(target="blank" ":href"="serviceLink" v-if="serviceLink !== '' && checkFunctionEnable('service-link')")
        mt-cell(":title"="$root.i18n('Customer Service')")
      router-link(":to"="{name: 'Notice-list'}" v-if="checkFunctionEnable('notice-list')")
        mt-cell(":title"="$root.i18n('Notice-list')")
    div
      a(href="/")
        mt-cell(":title"="$root.i18n('Switch to PC version')")
</template>

<script>
  import Vue from 'vue'
  import loginPanel from './login-panel'
  import { Header, Cell, Actionsheet } from 'mint-ui'
  import { SERVICELINK, SITELANGUAGES, SITE_FUNCTIONS } from '@/siteConfig'
  Vue.component(Header.name, Header)
  Vue.component(Cell.name, Cell)
  Vue.component(Actionsheet.name, Actionsheet)

  export default {
    name: 'main-menu',

    data () {
      return {
        serviceLink: SERVICELINK,
        siteLanguages: SITELANGUAGES,
        siteFunctions: SITE_FUNCTIONS
      }
    },

    methods: {
      checkFunctionEnable (functionName) {
        let target = this.siteFunctions.filter(node => node.name === functionName)
        if (target.length > 0) return target[0].enable
        return false
      },
      close () {
        this.$emit('closeBtnClick')
      },
      translateBtnClick () {
        this.$emit('translateBtnClick')
      },
      logout () {
        this.$root.logout()
      }
    },

    components: {
      loginPanel
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
