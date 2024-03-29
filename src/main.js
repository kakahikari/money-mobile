// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import helper from './helper'
import Vue from 'vue'
// import App from './App'
import router from './router'

// vuex
import store from 'hq-money-stores'
import { mapState, mapGetters, mapActions } from 'vuex'

// Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// filters
Vue.filter('currency', function (value) {
  return value.currency({})
})

// components
import vToast from '@/components/v-toast'
import VueFlatpickr from 'vue-flatpickr'
import icon from '@/components/icon'
Vue.component('icon', icon)
import { Lazyload } from 'mint-ui'
Vue.use(Lazyload)
import maintainPage from '@/pages/maintain-page'

Vue.config.productionTip = false

// style
import 'normalize.css/normalize.css'
import 'scss/style.scss'
import 'mint-ui/lib/style.css'

import { SITE_NAME } from '@/siteConfig'

/* eslint-disable no-new */
export const App = new Vue({
  created () {
    this.$store.dispatch('SET_DEFAULT')
    window.document.title = this.sitename[this.language]
  },

  data () {
    return {
      sitename: SITE_NAME
    }
  },

  computed: mapState({
    language: state => state.USER.language
  }),

  methods: {
    default () {
      this.$store.dispatch('ERASE_COOKIES')
      this.$router.replace({ path: '/' })
    },
    init () {
      return new Promise((resolve, reject) => {
        const params = { context: this }
        this.$store.dispatch('setUser', params).then((res) => {
          return resolve(res)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    login (formData) {
      return new Promise((resolve, reject) => {
        const params = {context: this, body: formData}
        this.$store.dispatch('login', params).then((res) => {
          this.$root.showToast({content: this.i18n('success')})
          return resolve(res)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    logout () {
      this.$store.dispatch('logout', {context: this})
      this.$root.showToast({type: 'warning', content: this.i18n('logged out')})
      return this.default()
    },
    i18n (str, language = this.language) {
      return helper.i18n(str, language)
    },
    showToast (obj) {
      this.$refs.vToast.add
        ? this.$refs.vToast.add(obj)
        : window.alert(obj.content)
    }
  },

  router,
  store,
  components: {
    vToast,
    icon,
    maintainPage
  }
}).$mount('#app')
