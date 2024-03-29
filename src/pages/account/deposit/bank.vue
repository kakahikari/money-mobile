<template lang="pug">
  section.deposit
    .form__fields.no-border
      div {{ $root.i18n('Please contact customer service for deposit bank account') }}
    .form__fields
      div(@click="openPicker()")
        mt-field(":label"="$root.i18n('Deposit date')" ":disabled"="true" v-model="formData.dateTime")
      form-errors(":errors"="$v.formData.dateTime")
      mt-datetime-picker(ref="picker" type="date" ":startDate"="startDate" ":endDate"="today" v-model="today" @confirm="dateTimeChange")
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Bankcard') }}
          .mint-cell-value
            select.mint-field-core(v-model="bank")
              option(":value"="{bankName: '', playername: '', account: ''}") {{ $root.i18n('please select') }}
              template(v-for="node in bankList")
                option(":value"="node") {{ node.bankName }} - {{ node.account }}
      form-errors(":errors"="$v.bank")
      mt-field(":label"="$root.i18n('Bank ACC name')" ":readonly"="!checkFunctionEnable('playernameEditable')" v-model="formData.playername")
      template(v-if="checkFunctionEnable('orderNo')")
        mt-field(":label"="$root.i18n('Order No')" v-model="formData.orderNo")
        form-errors(":errors"="$v.formData.orderNo")
      mt-field(":label"="$root.i18n('Amount')" v-model="formData.amount")
      form-errors(":errors"="$v.formData.amount")
    .form__fields.no-border
      div(v-if="currency === 'IDR(K)'") {{ $root.i18n('The IDR amount will be exchanged into IDR(K) in your purse at the rate of 1000：1') }}
      .form__actions__link
        router-link(":to"="{name: 'Bankcard'}") {{ $root.i18n('No linking bank card?') }}
        icon(name="keyboard_arrow_right")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import DepositService from 'hq-money-services/depositService'
  import moment from 'moment'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import formErrors from '@/components/form-errors'
  import { CURRENCY, SITE_FUNCTIONS } from '@/siteConfig'
  import { bank, date, depositAmount, orderNo } from '@/validators/config'
  import { Field, Button, DatetimePicker, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'deposit__bank',

    data () {
      return {
        bank: {
          bankName: '',
          playername: '',
          account: ''
        },
        formData: {
          amount: '',
          dateTime: '',
          bankName: '',
          account: '',
          playername: '',
          orderNo: ''
        },
        currency: CURRENCY,
        siteFunctions: SITE_FUNCTIONS
      }
    },

    computed: mapState({
      bankList: state => {
        return state.WALLET.bankList
      },
      startDate: () => {
        return moment().subtract(1, 'years').toDate()
      },
      today: () => {
        return moment().toDate()
      }
    }),

    watch: {
      bank (newVal) {
        if (newVal !== undefined) {
          this.formData.bankName = newVal.bankName
          this.formData.playername = newVal.name
          this.formData.account = newVal.account
        }
      }
    },

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        this.$store.dispatch('fetchBankList', {context: this})
      },
      init () {
        this.bank = {
          bankName: '',
          playername: '',
          account: ''
        }
        this.formData = {
          amount: '',
          dateTime: '',
          bankName: '',
          account: '',
          playername: '',
          orderNo: ''
        }
        this.$v.$reset()
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

        Indicator.open()
        DepositService.ATM({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.init()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      openPicker () {
        this.$refs.picker.open()
      },
      dateTimeChange (val) {
        this.formData.dateTime = moment(val).format('YYYY-MM-DD')
      },
      checkFunctionEnable (functionName) {
        let target = this.siteFunctions.filter(node => node.name === 'deposit')
        if (!target.length > 0) return false
        target = target[0].functions.filter(node => node.name === 'bank')
        if (!target.length > 0) return false
        let targetFunction = target[0].functions.filter(node => node.name === functionName)
        if (targetFunction.length > 0) return targetFunction[0].enable
        return false
      }
    },

    components: {
      formErrors
    },

    validations: {
      bank: bank,
      formData: {
        dateTime: date,
        amount: depositAmount({}),
        orderNo: orderNo
      }
    }
  }
</script>

<style lang="css" scoped>
  .deposit {
    padding-top: 10px;
  }
</style>
