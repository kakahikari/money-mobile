<template lang="pug">
  section.form.color
    .form__logo
      img(src="static/images/logo.png")
    .form__fields
      mt-field(":label"="$root.i18n('Account')" v-model="formData.username")
      mt-field(":label"="$root.i18n('Password')" type="password" v-model="formData.password")
      mt-field(":label"="$root.i18n('Validation')" v-model="formData.verification")
        v-verification(height="45px", width="88px", v-if="verification!=''" ":code"="verification")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
      .form__actions__link
        a(":href"="serviceLink" target="blank") {{ $root.i18n('Forgot password?') }}
      .form__actions__link
        router-link(":to"="{name: 'Register'}") {{ $root.i18n('Register for free') }}
        icon(name="keyboard_arrow_right")
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import vVerification from '@/components/form/v-verification'
  import Vue from 'vue'
  import { SERVICELINK } from '@/xhrConfig'
  import { Field, Button, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)

  export default {
    name: 'login',

    data () {
      return {
        verification: '',
        formData: {
          verification: '',
          username: '',
          password: ''
        },
        serviceLink: SERVICELINK
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
      action (formData) {
        if (this.formData.verification !== this.verification) return this.$root.showToast({type: 'warning', content: this.$root.i18n('please check validation code')})

        Indicator.open()
        this.$root.login(this.formData).then((res) => {
          this.init()
          Indicator.close()
          this.$router.push({name: 'index'})
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    },

    components: {
      vVerification
    }
  }
</script>
