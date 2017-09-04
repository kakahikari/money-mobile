<template lang="pug">
  section.deposit
    div(v-if="qrcode")
      .form__actions.center
        p 扫描下图存款
        div("v-html"="qrcode")
    div(v-else)
      .form__fields
        mt-field(":label"="$root.i18n('Amount')" v-model="formData.amount")
        form-errors(":errors"="$v.formData.amount")
      .form__actions
        mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
        mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
    vAutoSendForm(":params"="actions" v-if="!!actions.url")
</template>

<script>
  import DepositService from 'hq-money-services/depositService'
  import Vue from 'vue'
  import formErrors from '@/components/form-errors'
  import formError from '@/components/form-errors/form-error'
  import vAutoSendForm from '@/components/form/v-auto-send-form'
  import { depositAmount } from '@/validators/config'
  import qrcode from 'qrcode-npm'
  import { Field, Button, DatetimePicker, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'deposit__weixin',

    data () {
      return {
        actions: {
          url: '',
          keys: []
        },
        formData: {
          amount: '',
          type: 'weixin_scan'
        },
        qrcode: ''
      }
    },

    methods: {
      init () {
        this.formData = {
          amount: '',
          type: 'weixin_scan'
        }
        this.$v.$reset()
        setTimeout(() => {
          this.actions = {
            url: '',
            keys: []
          }
        }, 500)
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

        Indicator.open()
        DepositService.DinPay({context: this, body: formData}).then((res) => {
          Indicator.close()
          var qr = qrcode.qrcode(4, 'M')
          qr.addData(res.url)
          qr.make()
          this.qrcode = qr.createImgTag(4)
          this.init()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    },

    components: {
      formErrors,
      formError,
      vAutoSendForm
    },

    validations: {
      formData: {
        amount: depositAmount({})
      }
    }
  }
</script>

<style lang="css" scoped>
  .deposit {
    padding-top: 10px;
  }
</style>
