<template lang="pug">
  section.withdraw
    .form__fields
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Bankcard') }}
          .mint-cell-value
            select.mint-field-core(v-model="formData.bank")
              template(v-for="node in bankList")
                option(":value"="node") {{ node.bankName }} - {{ node.account }}
      form-errors(":errors"="$v.formData.bank")
      mt-field(":label"="$root.i18n('Withdraw PW')" type="password" v-model="formData.withdrawPW")
      form-errors(":errors"="$v.formData.withdrawPW")
      mt-field(":label"="$root.i18n('Amount')" v-model="formData.amount")
      form-errors(":errors"="$v.formData.amount")
        form-error(v-if="!$v.formData.amount.between") {{ $root.i18n('must between') }} 100 ~ 1,000,000
    .form__fields.no-border
      .form__actions__link
        router-link(":to"="{name: 'Bankcard'}") {{ $root.i18n('No linking bank card?') }}
        icon(name="keyboard_arrow_right")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
import WalletService from 'hq-money-services/walletService'
import Vue from 'vue'
import { mapState } from 'vuex'
import formErrors from '@/components/form-errors'
import formError from '@/components/form-errors/form-error'
import { amount, bank, withdrawPW } from '@/validators/config'
import { Field, Button, Indicator } from 'mint-ui'
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)

export default {
  name: 'account__withdraw',

  data () {
    return {
      formData: {
        amount: '',
        bank: {},
        withdrawPW: ''
      }
    }
  },

  computed: mapState({
    bankList: state => {
      return state.WALLET.bankList
    }
  }),

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.$store.dispatch('fetchBankList', {context: this})
    },
    init () {
      this.formData = {
        amount: '',
        bank: {},
        withdrawPW: ''
      }
    },
    action (formData) {
      this.$v.$touch()
      if (this.$v.$error) return

      Indicator.open()
      WalletService.withdraw({context: this, body: formData}).then((res) => {
        Indicator.close()
        this.$root.showToast({content: this.$root.i18n('success')})
        this.init()
      }).catch((err) => {
        Indicator.close()
        this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
      })
    }
  },

  components: {
    formErrors,
    formError
  },

  validations: {
    formData: {
      amount: amount({min: 100, max: 1000000}),
      withdrawPW,
      bank: bank
    }
  }
}
</script>

<style lang="css" scoped>
  .withdraw {
    padding-top: 10px;
  }
</style>
