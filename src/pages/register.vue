<template lang="pug">
  section.form
    .form__logo
      img(src="static/images/logo.png")
    .form__fields
      mt-field(":label"="$root.i18n('Referral ID')" v-model="formData.recommender" ":placeholder"="$root.i18n('Optional')")
      mt-field(":label"="$root.i18n('Account')" v-model="formData.username")
      mt-field(":label"="$root.i18n('Password')" type="password" v-model="formData.password")
      mt-field(":label"="$root.i18n('Confirm PW')" type="password" v-model="formData.checkPW")
      mt-field(":label"="$root.i18n('Validation')" v-model="formData.verification")
        v-verification(height="45px", width="88px", v-if="verification!=''" ":code"="verification")
      mt-checklist(":options"="options" v-model="terms")
      .mint-cell-wrapper
        router-link.form__actions__link(":to"="{name: 'Terms'}") {{ $root.i18n('Terms of service') }}
          icon(name="keyboard_arrow_right")
    .form__actions
      mt-button.form__actions__btn(type="primary" plain @click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(plain @click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import vVerification from '@/components/form/v-verification'
  import Vue from 'vue'
  import { Field, Button, Checklist, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)
  Vue.component(Checklist.name, Checklist)

  export default {
    name: 'login',

    data () {
      return {
        terms: [],
        verification: '',
        formData: {
          verification: '',
          username: '',
          password: '',
          checkPW: '',
          withdrawPW: '',
          recommender: ''
        }
      }
    },

    computed: {
      options () {
        return [
          { label: this.$root.i18n('I agree to terms, and I am over 18 years old'), value: 1 }
        ]
      },
      agree () {
        return this.terms.includes(1)
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
          password: '',
          checkPW: '',
          withdrawPW: '',
          recommender: ''
        }
        this.randomCode()
      },
      async randomCode () {
        let rand = await Math.floor(Math.random() * 10000).toString()
        this.verification = rand
      },
      action (formData) {
        if (this.formData.verification !== this.verification) return this.$root.showToast({type: 'warning', content: this.$root.i18n('please check validation code')})
        if (!this.agree) return this.$root.showToast({type: 'warning', content: this.$root.i18n('please check terms of service')})

        Indicator.open()
        UserService.create({context: this, body: formData}).then((res) => {
          window.setTimeout(() => {
            Indicator.close()
            this.$root.login(formData).then((res) => {
              this.$router.replace({name: 'index'})
            }).catch((err) => {
              this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
              this.$router.replace({name: 'index'})
            })
          }, 1500)
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
