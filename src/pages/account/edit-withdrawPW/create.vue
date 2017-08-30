<template lang="pug">
.create
  .form__fields
    mt-field(":label"="$root.i18n('New withdraw PW')" type="password" v-model="formData.withdrawPW")
    form-errors(":errors"="$v.formData.withdrawPW")
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
  import { withdrawPW, checkPW } from '@/validators/config'
  import { Field, Button, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)

  export default {
    name: 'edit-withdrawPW__create',

    data () {
      return {
        formData: {
          withdrawPW: '',
          checkPW: ''
        }
      }
    },

    methods: {
      init () {
        this.formData = {
          withdrawPW: '',
          checkPW: ''
        }
        this.$v.$reset()
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

        Indicator.open()
        UserService.create_withdrawPW({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.$store.dispatch('setIsWiitdrawPW', true)
          this.init()
        }).catch((err) => {
          Indicator.close()
          this.$store.dispatch('setIsWiitdrawPW', false)
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    },

    components: {
      formErrors
    },

    validations: {
      formData: {
        withdrawPW,
        checkPW: checkPW('withdrawPW')
      }
    }
  }
</script>
