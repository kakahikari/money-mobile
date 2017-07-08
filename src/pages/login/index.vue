<template lang="pug">
  section
    .logo
      img(src="static/images/logo.png")
    .form
      mt-field(":label"="$root.i18n('Account')" v-model="formData.username")
      mt-field(":label"="$root.i18n('Password')" type="password" v-model="formData.password")
      mt-field(":label"="$root.i18n('Validation')" v-model="formData.verification")
        v-verification(height="45px", width="88px", v-if="verification!=''" ":code"="verification")
    .actions
      mt-button.actions-btn(type="primary" plain @click="action()") {{ $root.i18n('Submit') }}
      .mint-cell-wrapper
        a.actions-link {{ $root.i18n('Forgot password?') }}
      .mint-cell-wrapper
        router-link.actions-link(":to"="{name: 'Register'}") {{ $root.i18n('Register for free') }}
          icon(name="keyboard_arrow_right")
</template>

<script>
  import vVerification from '@/components/form/v-verification'
  import Vue from 'vue'
  import { Field, Button, Indicator } from 'mint-ui'
  Vue.component('mt-field', Field)
  Vue.component('mt-button', Button)

  export default {
    name: 'login',

    data () {
      return {
        verification: '',
        formData: {
          verification: '',
          username: '',
          password: ''
        }
      }
    },

    created () {
      this.randomCode()
    },

    methods: {
      init () {
        this.formData = {
          verification: '',
          username: '',
          password: ''
        }
        this.randomCode()
      },
      async randomCode () {
        let rand = await Math.floor(Math.random() * 10000).toString()
        this.verification = rand
      },
      action () {
        if (this.formData.verification !== this.verification) return this.$root.showToast({type: 'warning', content: this.$root.i18n('please check validation code')})

        Indicator.open()
        this.$root.login(this.formData).then((res) => {
          this.init()
          Indicator.close()
          this.$router.push({name: 'index'})
        }).catch(() => {
          Indicator.close()
        })
      }
    },

    components: {
      vVerification
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
