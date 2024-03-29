<template lang="pug">
  section.history
    .form__fields
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Kind') }}
          .mint-cell-value
            select.mint-field-core(v-model="type")
              template(v-for="node in options")
                option(":value"="node.value") {{ $root.i18n(node.text) }}
      template(v-if="type === 'bet'")
        .mint-cell.mint-field
          .mint-cell-wrapper
            .mint-cell-title
              span.mint-cell-text {{ $root.i18n('Platform') }}
            .mint-cell-value
              select.mint-field-core(v-model="platform")
                option(value="") {{ $root.i18n('please select') }}
                template(v-for="node in platformOptions")
                  option(":value"="node.id") {{ node.text }}
        form-errors(":errors"="$v.platform")
      div(@click="openStartPicker()")
        mt-field(":label"="$root.i18n('Start date')" ":disabled"="true" v-model="formData.startDate")
      form-errors(":errors"="$v.formData.startDate")
      mt-datetime-picker(ref="sPicker" type="date" ":startDate"="startDate" ":endDate"="today" v-model="today" @confirm="startDateChange")
      div(@click="openEndPicker()")
        mt-field(":label"="$root.i18n('End date')" ":disabled"="true" v-model="formData.endDate")
      form-errors(":errors"="$v.formData.endDate")
      mt-datetime-picker(ref="ePicker" type="date" ":startDate"="startDate" ":endDate"="today" v-model="today" @confirm="endDateChange")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData, type)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
    .form__result(v-if="isShowResult")
      v-table(":data"="list", ":columns"="columns", ":page-size"="10")
</template>

<script>
  import HistoryService from 'hq-money-services/historyService'
  import moment from 'moment'
  import Vue from 'vue'
  import formErrors from '@/components/form-errors'
  import { date, platform } from '@/validators/config'
  import vTable from '@/components/form/v-table'
  import { GAME_GROUP, SITE_FUNCTIONS } from '@/siteConfig'
  import { Field, Button, DatetimePicker, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'history',

    data () {
      return {
        isShowResult: false,
        type: '',
        platform: '',
        platformOptions: GAME_GROUP,
        formData: {
          startDate: '',
          endDate: ''
        },
        list: [],
        columns: {},
        siteFunctions: SITE_FUNCTIONS
      }
    },

    computed: {
      options: function () {
        let out = [
          {value: '', text: 'please select'}
        ]
        if (this.checkFunctionEnable('deposit')) out.push({value: 'deposit', text: 'deposit'})
        if (this.checkFunctionEnable('withdraw')) out.push({value: 'withdraw', text: 'withdraw'})
        if (this.checkFunctionEnable('transfer')) out.push({value: 'transfer', text: 'transfer'})
        out.push({value: 'login', text: 'login'})
        out.push({value: 'bet', text: 'bet'})
        return out
      },
      startDate: () => {
        return moment().subtract(1, 'years').toDate()
      },
      today: () => {
        return moment().toDate()
      }
    },

    created () {
      this.init()
    },

    methods: {
      init () {
        this.type = ''
        this.formData = {
          startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
          endDate: moment().format('YYYY-MM-DD')
        }
        this.$v.$reset()
      },
      action (formData, type) {
        this.$v.formData.$touch()
        if (this.$v.formData.$error) return

        switch (type) {
          case 'deposit':
            this.fecthDeposit(formData)
            break
          case 'withdraw':
            this.fecthWithdraw(formData)
            break
          case 'transfer':
            this.fecthTransfer(formData)
            break
          case 'login':
            this.fecthLogin(formData)
            break
          case 'bet':
            this.$v.platform.$touch()
            if (this.$v.platform.$error) return
            this.fecthBet(formData)
            break
          case '':
          default:
            this.$root.showToast({type: 'warning', content: this.$root.i18n('please select kind')})
        }
      },
      fecthDeposit (formData) {
        Indicator.open()
        HistoryService.deposit({context: this, body: formData}).then((res) => {
          this.list = res
          const columns = {
            status: { legend: this.$root.i18n('status') },
            dateTime: { legend: this.$root.i18n('time'), style: {whiteSpace: 'nowrap'} },
            type: { legend: this.$root.i18n('type') },
            amount: { legend: this.$root.i18n('amount'), style: {textAlign: 'right'} }
          }
          this.columns = columns
          this.isShowResult = true
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
        }).catch((err) => {
          Indicator.close()
          this.isShowResult = false
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      fecthWithdraw (formData) {
        Indicator.open()
        HistoryService.withdraw({context: this, body: formData}).then((res) => {
          this.list = res
          const columns = {
            status: { legend: this.$root.i18n('status') },
            dateTime: { legend: this.$root.i18n('time'), style: {whiteSpace: 'nowrap'} },
            amount: { legend: this.$root.i18n('amount'), style: {textAlign: 'right'} }
          }
          this.columns = columns
          this.isShowResult = true
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
        }).catch((err) => {
          Indicator.close()
          this.isShowResult = false
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      fecthTransfer (formData) {
        Indicator.open()
        HistoryService.transfer({context: this, body: formData}).then((res) => {
          this.list = res
          const columns = {
            status: { legend: this.$root.i18n('status') },
            dateTime: { legend: this.$root.i18n('time'), style: {whiteSpace: 'nowrap'} },
            from: { legend: this.$root.i18n('transfer from') },
            to: { legend: this.$root.i18n('transfer to') },
            amount: { legend: this.$root.i18n('amount'), style: {textAlign: 'right'} }
          }
          this.columns = columns
          this.isShowResult = true
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
        }).catch((err) => {
          Indicator.close()
          this.isShowResult = false
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      fecthLogin (formData) {
        Indicator.open()
        HistoryService.login({context: this, body: formData}).then((res) => {
          this.list = res
          const columns = {
            status: { legend: this.$root.i18n('status') },
            dateTime: { legend: this.$root.i18n('time'), style: {whiteSpace: 'nowrap'} }
          }
          this.columns = columns
          this.isShowResult = true
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
        }).catch((err) => {
          Indicator.close()
          this.isShowResult = false
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      fecthBet (formData) {
        Indicator.open()
        HistoryService.bet({context: this, body: formData}).then((res) => {
          const columns = {
            time: { legend: this.$root.i18n('time') },
            bet_all: { legend: this.$root.i18n('total bet'), style: {textAlign: 'right'} },
            win: { legend: this.$root.i18n('winning'), style: {textAlign: 'right'} }
          }
          this.columns = columns
          Indicator.close()
          const target = res.filter(node => node.name === this.platform)
          if (target.length >= 1) {
            this.list = target[0].list
            if (this.list.length >= 1) {
              this.$root.showToast({content: this.$root.i18n('success')})
              this.isShowResult = true
            } else {
              this.isShowResult = false
              this.$root.showToast({type: 'warning', content: this.$root.i18n('no data')})
            }
          } else {
            this.isShowResult = false
            this.$root.showToast({type: 'warning', content: this.$root.i18n('this game platform not found')})
          }
        }).catch((err) => {
          Indicator.close()
          this.isShowResult = false
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      openStartPicker () {
        this.$refs.sPicker.open()
      },
      openEndPicker () {
        this.$refs.ePicker.open()
      },
      startDateChange (val) {
        this.formData.startDate = moment(val).format('YYYY-MM-DD')
      },
      endDateChange (val) {
        this.formData.endDate = moment(val).format('YYYY-MM-DD')
      },
      checkFunctionEnable (functionName) {
        let target = this.siteFunctions.filter(node => node.name === functionName)
        if (target.length > 0) return target[0].enable
        return false
      }
    },

    components: {
      formErrors,
      vTable
    },

    validations: {
      platform: platform,
      formData: {
        startDate: date,
        endDate: date
      }
    }
  }
</script>

<style lang="css" scoped>
  .history {
    padding-top: 10px;
  }
</style>
