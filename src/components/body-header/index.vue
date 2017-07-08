<template lang="pug">
  header
    mt-header(fixed ":title"="pageTitle")
      .header__bottom.menu(slot="left" @click="menuToogle()")
        icon(name="menu")
    .logo(v-if="$route.name == 'index'")
      img(src="static/images/logo.png")
    mt-popup(position="left" v-model="menuActive")
      main-menu(
        @closeBtnClick="menuToogle(false)"
        @translateBtnClick="actionsheetToogle()"
      )
    mt-actionsheet(":actions"="language" v-model="actionsheetActive" ":cancelText"="$root.i18n('cancel')")
</template>

<script>
  import Vue from 'vue'
  import mainMenu from '@/components/main-menu'
  import { Header, Button, Popup } from 'mint-ui'
  Vue.component('mt-header', Header)
  Vue.component('mt-button', Button)
  Vue.component('mt-popup', Popup)

  export default {
    name: 'body-header',

    data () {
      return {
        menuActive: false,
        actionsheetActive: false,
        language: [
          { name: '中文', method: this.translate },
          { name: 'English', method: this.translate }
        ]
      }
    },

    computed: {
      pageTitle () {
        if (this.$route.name === 'index') return ''
        return this.$root.i18n(this.$route.name)
      }
    },

    watch: {
      '$route' (to, from) {
        this.menuToogle(false)
      }
    },

    methods: {
      menuToogle (val) {
        if (val !== undefined) this.menuActive = val
        else this.menuActive = !this.menuActive
      },
      actionsheetToogle () {
        this.actionsheetActive = true
      },
      translate (val) {
        if (val.name === 'English') this.$store.commit('SET_USER_LANGUAGE', 'en')
        else this.$store.commit('SET_USER_LANGUAGE', 'cn')
        this.menuToogle(false)
      }
    },

    components: {
      mainMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
