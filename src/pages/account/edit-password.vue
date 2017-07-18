<template lang="pug">
section.form
  .form__fields
    mt-field(":label"="$root.i18n('Password')" type="password" v-model="formData.password")
    mt-field(":label"="$root.i18n('New password')" type="password" v-model="formData.newPW")
    mt-field(":label"="$root.i18n('Check new password')" type="password" v-model="formData.checkPW")
  .form__actions
    mt-button.form__actions__btn(type="primary" plain @click="action(formData)") {{ $root.i18n('Submit') }}
    mt-button.form__actions__btn(plain @click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import Vue from 'vue'
  import { Field, Button, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)

  export default {
    name: 'account__edit-password',

    data () {
      return {
        formData: {
          password: '',
          newPW: '',
          checkPW: ''
        }
      }
    },

    methods: {
      init () {
        this.formData = {
          password: '',
          newPW: '',
          checkPW: ''
        }
      },
      action (formData) {
        Indicator.open()
        UserService.update_pw({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.$root.logout()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    }
  }
</script>

<style lang="css">
</style>
