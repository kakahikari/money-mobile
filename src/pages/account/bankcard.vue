<template lang="pug">
  section.bankcard
    .info
      .row(@click="toogleBankList()")
        .info__item.main
          .info__item__title {{ $root.i18n('Linked bank card') }}
          .info__item__icon
            icon(name="keyboard_arrow_down" v-if="bankListActive")
            icon(name="keyboard_arrow_up" v-else)
      transition(name="slideUp")
        table(v-if="bankListActive")
          tr
            th {{ $root.i18n('Bank name') }}
            th {{ $root.i18n('Bank account') }}
            th {{ $root.i18n('Bank ACC name') }}
          tr(v-for="node in bankList")
            td {{ node.bankName }} {{ node.branch? `- ${node.branch}` : `` }}
            td {{ node.account }}
            td {{ node.name }}
    .form__fields
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Bank name') }}
          .mint-cell-value
            select.mint-field-core(v-model="bankName")
              option(value="") {{ $root.i18n('please select') }}
              template(v-if="checkFunctionEnable('uselocalBankOpts')")
                template(v-for="node in localBankOpts")
                  option(":value"="node.value") {{ node.name }}
              template(v-else)
                template(v-for="node in bankOpts")
                  option(":value"="node.value") {{ node.name }}
      mt-field(v-model="formData.bankName" v-if="bankName=='other'" ":placeholder"="$root.i18n('Please input bank name')")
      form-errors(":errors"="$v.formData.bankName")
      template(v-if="checkFunctionEnable('branch')")
        mt-field(":label"="$root.i18n('Branch')" v-model="formData.branch")
        form-errors(":errors"="$v.formData.branch")
      mt-field(":label"="$root.i18n('Bank account')" v-model="formData.account")
      form-errors(":errors"="$v.formData.account")
      mt-field(":label"="$root.i18n('Confirm bank ACC')" v-model="formData.checkAccount")
      form-errors(":errors"="$v.formData.checkAccount")
      mt-field(":label"="$root.i18n('Bank ACC name')" v-model="formData.playername" ":readonly"="!checkFunctionEnable('playernameEditable')")
      form-errors(":errors"="$v.formData.playername")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import WalletService from 'hq-money-services/walletService'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import formErrors from '@/components/form-errors'
  import { SITE_FUNCTIONS, BANK_OPTS } from '@/siteConfig'
  import { bankName, branch, account, checkPW, playerName } from '@/validators/config'
  import { Field, Button, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)

  export default {
    name: 'account__bankcard',

    data () {
      return {
        bankListActive: true,
        bankName: '',
        formData: {
          bankName: '',
          branch: '',
          playername: '',
          account: '',
          checkAccount: ''
        },
        siteFunctions: SITE_FUNCTIONS,
        localBankOpts: BANK_OPTS
      }
    },

    computed: mapState({
      playername: state => {
        return state.USER.playername
      },
      bankList: state => {
        return state.WALLET.bankList
      },
      bankOpts: state => {
        return state.WALLET.bankOpts
      }
    }),

    watch: {
      bankName (newVal) {
        if (newVal === 'other') {
          this.formData.bankName = ''
        } else {
          this.formData.bankName = newVal
        }
      }
    },

    created () {
      this.fetchBankList()
      this.fetchBankOpts()
      this.init()
    },

    methods: {
      fetchBankList () {
        this.$store.dispatch('fetchBankList', {context: this})
      },
      fetchBankOpts () {
        Indicator.open()
        this.$store.dispatch('getBankOpts', {context: this}).then((res) => {
          window.setTimeout(() => {
            Indicator.close()
          }, 100)
        }).catch((err) => {
          window.setTimeout(() => {
            Indicator.close()
          }, 100)
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      init () {
        this.bankName = ''
        this.formData = {
          bankName: '',
          branch: '',
          playername: this.playername,
          account: '',
          checkAccount: ''
        }
        this.$v.$reset()
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

        Indicator.open()
        if (formData.branch === '') formData.branch = 'nobranch'
        WalletService.create_bank({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.init()
          this.fetchBankList()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      toogleBankList () {
        this.bankListActive = !this.bankListActive
      },
      checkFunctionEnable (functionName) {
        let target = this.siteFunctions.filter(node => node.name === 'bankcard')
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
      formData: {
        bankName,
        branch,
        account,
        checkAccount: checkPW('account'),
        playername: playerName({})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
