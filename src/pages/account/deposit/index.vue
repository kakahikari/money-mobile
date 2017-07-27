<template lang="pug">
  section.deposit
    .form__fields
      div(@click="openPicker()")
        mt-field(":label"="$root.i18n('Deposit date')" ":disabled"="true" v-model="formData.dateTime")
      mt-datetime-picker(ref="picker" type="date" ":startDate"="startDate" ":endDate"="new Date()" @confirm="dateTimeChange")
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Bankcard') }}
          .mint-cell-value
            select.mint-field-core(v-model="bank")
              template(v-for="node in bankList")
                option(":value"="node") {{ node.bankName }} - {{ node.account }}
      mt-field(":label"="$root.i18n('Bank ACC name')" ":readonly"="true" v-model="formData.playername")
      mt-field(":label"="$root.i18n('Order No')" v-model="formData.orderNo")
      mt-field(":label"="$root.i18n('Amount')" v-model="formData.amount")
    .form__fields.no-border
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
  import { Field, Button, DatetimePicker, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'deposit',

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
        }
      }
    },

    computed: mapState({
      bankList: state => {
        return state.WALLET.bankList
      },
      startDate: () => {
        return moment().subtract(1, 'years').toDate()
      }
    }),

    watch: {
      bank (newVal) {
        if (newVal !== undefined) {
          this.formData.bankName = newVal.bankName
          this.formData.playername = newVal.playername
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
      },
      action (formData) {
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
      }
    }
  }
</script>

<style lang="css" scoped>
  .deposit {
    padding-top: 10px;
  }
</style>
