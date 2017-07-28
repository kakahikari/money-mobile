<template lang="pug">
  header
    transition(name="slideUp")
      marquee(v-if="marqueeActive" @marqueeToggle="marqueeToggle()")
    mt-header(fixed ":title"="pageTitle" ":class"="{'marquee-active': marqueeActive}")
      .header__button(v-if="!isLastPage" slot="left" @click="menuToogle()")
        icon(name="menu")
      .header__button(v-else slot="left" @click="doBack()")
        icon(name="chevron_left")
      router-link.header__button(slot="right" ":to"="{name: 'Mails'}")
        mail-panel
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
  import mailPanel from '@/components/mail-panel'
  import mainMenu from '@/components/main-menu'
  import { SITELANGUAGES } from '@/siteConfig'
  import { errorCodes } from '@/xhrConfig'
  import { Header, Button, Popup, Badge } from 'mint-ui'
  Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)
  Vue.component(Popup.name, Popup)
  Vue.component(Badge.name, Badge)

  export default {
    name: 'body-header',

    data () {
      return {
        menuActive: false,
        actionsheetActive: false,
        marqueeActive: true,
        isLastPage: false
      }
    },

    computed: {
      pageTitle () {
        if (this.$route.name === 'index') return ''
        return this.$root.i18n(this.$route.name)
      },
      language () {
        let out = []
        SITELANGUAGES.forEach((node) => {
          out.push({ name: node.text, method: this.translate })
        })
        return out
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
        let target = SITELANGUAGES.filter(node => node.text === val.name)
        if (target.length > 0) this.$store.commit('SET_USER_LANGUAGE', target[0].value)
        else this.$root.showToast({type: 'warning', content: this.$root.i18n(errorCodes['v-no-language'])})
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
      mailPanel,
      mainMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
