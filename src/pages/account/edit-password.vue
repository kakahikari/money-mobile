<template lang="pug">
section.form.edit
  .form__fields
    mt-field(":label"="$root.i18n('Password')" type="password" v-model="formData.password")
    form-errors(":errors"="$v.formData.password")
    mt-field(":label"="$root.i18n('New password')" type="password" v-model="formData.newPW")
    form-errors(":errors"="$v.formData.newPW")
    mt-field(":label"="$root.i18n('Confirm password')" type="password" v-model="formData.checkPW")
    form-errors(":errors"="$v.formData.checkPW")
  .form__actions
    mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
    mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import Vue from 'vue'
  import formErrors from '@/components/form-errors'
  import { password, checkPW } from '@/validators/config'
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
        this.$v.$reset()
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

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
    },

    components: {
      formErrors
    },

    validations: {
      formData: {
        password: password,
        newPW: password,
        checkPW: checkPW('newPW')
      }
    }
  }
</script>

<style lang="css" scoped>
.edit {
  padding-top: 10px;
}
</style>
