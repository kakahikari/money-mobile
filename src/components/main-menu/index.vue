<template lang="pug">
  section.main-menu
    button.close-button(@click="close()")
      icon(name="close" slot="icon")
    button.translate-button(@click="translateBtnClick()")
      icon(name="language" slot="icon")
    login-panel
    nav
      router-link(":to"="{name: 'index'}")
        mt-cell(":title"="$root.i18n('Index')")
          icon(name="home")
      router-link(":to"="{name: 'Games'}")
        mt-cell(":title"="$root.i18n('Games')")
      router-link(":to"="{name: 'Promotions'}")
        mt-cell(":title"="$root.i18n('Promotions')")
      a(target="blank" ":href"="serviceLink")
        mt-cell(":title"="$root.i18n('Customer Service')")
      router-link(":to"="{name: 'Notice-list'}")
        mt-cell(":title"="$root.i18n('Notice-list')")
      //- a
      //-   mt-cell(title="常見問題")
    div
      a(href="/")
        mt-cell(":title"="$root.i18n('Switch to PC version')")
</template>

<script>
  import Vue from 'vue'
  import loginPanel from './login-panel'
  import { Header, Cell, Actionsheet } from 'mint-ui'
  import { SERVICELINK } from '@/xhrConfig'
  Vue.component(Header.name, Header)
  Vue.component(Cell.name, Cell)
  Vue.component(Actionsheet.name, Actionsheet)

  export default {
    name: 'main-menu',

    data () {
      return {
        serviceLink: SERVICELINK
      }
    },

    methods: {
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
