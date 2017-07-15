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
      router-link(":to"="{name: 'Games'}")
        mt-cell(":title"="$root.i18n('Games')")
      router-link(":to"="{name: 'Promotions'}")
        mt-cell(":title"="$root.i18n('Promotions')")
      mt-cell(title="線上客服")
      mt-cell(title="常見問題")
      router-link(":to"="{name: 'Notice-list'}")
        mt-cell(":title"="$root.i18n('Notice-list')")
    div
      mt-cell(title="切換電腦版")
</template>

<script>
  import Vue from 'vue'
  import loginPanel from './login-panel'
  import { Header, Cell, Actionsheet } from 'mint-ui'
  Vue.component(Header.name, Header)
  Vue.component(Cell.name, Cell)
  Vue.component(Actionsheet.name, Actionsheet)

  export default {
    name: 'main-menu',

    methods: {
      close () {
        this.$emit('closeBtnClick')
      },
      translateBtnClick () {
        this.$emit('translateBtnClick')
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
