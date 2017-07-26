<template lang="pug">
section.form.edit(v-if="withdrawPWChecked")
  template(v-if="$store.state.AUTH.isWithdrawPW")
    .form__fields
      mt-field(":label"="$root.i18n('Withdraw PW')" type="password" v-model="formData.withdrawPW")
      mt-field(":label"="$root.i18n('New withdraw PW')" type="password" v-model="formData.newPW")
      mt-field(":label"="$root.i18n('Check new password')" type="password" v-model="formData.checkPW")
  template(v-else)
    .form__fields
      mt-field(":label"="$root.i18n('New withdraw PW')" type="password" v-model="formData.withdrawPW")
      mt-field(":label"="$root.i18n('Check new password')" type="password" v-model="formData.checkPW")
  .form__actions
    mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
    mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Field, Button, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)

  export default {
    name: 'account__edit-withdrawPW',

    data () {
      return {
        formData: {
          withdrawPW: '',
          newPW: '',
          checkPW: ''
        }
      }
    },

    computed: mapState({
      withdrawPWChecked: state => state.AUTH.withdrawPWChecked,
      isWithdrawPW: state => state.AUTH.isWithdrawPW
    }),

    methods: {
      init () {
        this.formData = {
          withdrawPW: '',
          newPW: '',
          checkPW: ''
        }
      },
      action (formData) {
        if (this.isWithdrawPW) this.update(formData)
        else this.create(formData)
      },
      create (formData) {
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
      },
      update (formData) {
        Indicator.open()
        UserService.update_withdrawPW({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.init()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    }
  }
</script>

<style lang="css" scoped>
.edit {
  padding-top: 10px;
}
</style>
