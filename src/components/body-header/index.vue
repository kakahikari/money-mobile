<template lang="pug">
  header
    transition(name="slideUp")
      marquee(v-if="marqueeActive" @marqueeToggle="marqueeToggle()")
    mt-header(fixed ":title"="pageTitle" ":class"="{'marquee-active': marqueeActive}")
      .header__buttom(v-if="!isLastPage" slot="left" @click="menuToogle()")
        icon(name="menu")
      .header__buttom(v-else slot="left" @click="doBack()")
        icon(name="chevron_left")
    .logo(v-if="$route.name == 'index'" ":class"="{'marquee-active': marqueeActive}")
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
  import marquee from './marquee'
  import mainMenu from '@/components/main-menu'
  import { Header, Button, Popup } from 'mint-ui'
  Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)
  Vue.component(Popup.name, Popup)

  export default {
    name: 'body-header',

    data () {
      return {
        menuActive: false,
        actionsheetActive: false,
        marqueeActive: true,
        language: [
          { name: '中文', method: this.translate },
          { name: 'English', method: this.translate }
        ],
        isLastPage: false
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
        this.checkIsLastpage()
      }
    },

    created () {
      this.checkIsLastpage()
    },

    methods: {
      menuToogle (val) {
        if (val !== undefined) this.menuActive = val
        else this.menuActive = !this.menuActive
      },
      actionsheetToogle () {
        this.actionsheetActive = true
      },
      marqueeToggle () {
        this.marqueeActive = !this.marqueeActive
        this.$emit('marqueeToggle', this.marqueeActive)
      },
      translate (val) {
        if (val.name === 'English') this.$store.commit('SET_USER_LANGUAGE', 'en')
        else this.$store.commit('SET_USER_LANGUAGE', 'cn')
        this.menuToogle(false)
      },
      checkIsLastpage () {
        this.isLastPage = this.$route.meta.isLastPage || false
      },
      doBack () {
        this.$router.go(-1)
      }
    },

    components: {
      marquee,
      mainMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
