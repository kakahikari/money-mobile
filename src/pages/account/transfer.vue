<template lang="pug">
  section.form
    .info
      .row(@click="toogleWalletDetails()")
        .info__item.main
          .info__item__title {{ $root.i18n(walletList[centerWallet.id]) }}
          .info__item__val.money {{ centerWallet.balance.toString() | currency }}
          .info__item__icon
            icon(name="keyboard_arrow_down" v-if="walletDetailsActive")
            icon(name="keyboard_arrow_up" v-else)
      transition(name="slideUp")
        .row(v-if="walletDetailsActive")
          .info__item.gamegroup(v-for="node in displayWallet")
            .info__item__title {{ walletList[node.id] }}
            .info__item__val.money {{ node.balance.toString() | currency }}
    .form__fields
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Transfer from') }}
          .mint-cell-value
            select.mint-field-core(v-model="formData.from")
              option(value="") {{ $root.i18n('please select') }}
              option(":value"="centerWallet.id") {{ $root.i18n(walletList[centerWallet.id]) }}
              template(v-for="node in displayWallet")
                option(":value"="node.id") {{ walletList[node.id] }}
      form-errors(":errors"="$v.formData.from")
      .mint-cell.mint-field
        .mint-cell-wrapper
          .mint-cell-title
            span.mint-cell-text {{ $root.i18n('Transfer to') }}
          .mint-cell-value
            select.mint-field-core(v-model="formData.to")
              option(value="") {{ $root.i18n('please select') }}
              option(":value"="centerWallet.id") {{ $root.i18n(walletList[centerWallet.id]) }}
              template(v-for="node in displayWallet")
                option(":value"="node.id") {{ walletList[node.id] }}
      form-errors(":errors"="$v.formData.to")
      mt-field(":label"="$root.i18n('Amount')" v-model="formData.amount")
      form-errors(":errors"="$v.formData.amount")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import WalletService from 'hq-money-services/walletService'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import formErrors from '@/components/form-errors'
  import { GAME_GROUP } from '@/siteConfig'
  import { from, transferAmount, to } from '@/validators/config'
  import { Field, Button, Indicator } from 'mint-ui'
  import { walletList } from '@/xhrConfig'
  Vue.component(Field.name, Field)
  Vue.component(Button.name, Button)

  export default {
    name: 'account__transfer',

    data () {
      return {
        gamegroup: GAME_GROUP,
        walletList: walletList,
        walletDetailsActive: true,
        formData: {
          amount: '',
          from: '',
          to: ''
        }
      }
    },

    computed: mapState({
      username: state => {
        return state.USER.username
      },
      centerWallet: state => {
        let target = state.WALLET.details.filter(node => node.id === '0')
        if (target.length > 0) return target[0]
        return { id: '0', balance: 0 }
      },
      walletDetails: state => {
        return state.WALLET.details.filter(node => node.id !== '0')
      },
      displayWallet: function () {
        let target = this.walletDetails.filter((node) => {
          let subTarget = this.gamegroup.filter(subnode => subnode.id === node.id)
          if (subTarget.length > 0) return node
        })
        return target
      }
    }),

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        Indicator.open()
        this.$store.dispatch('fetchWallets', {context: this}).then((res) => {
          Indicator.close()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      init () {
        this.formData = {
          amount: '',
          from: '',
          to: ''
        }
        this.$v.$reset()
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

        Indicator.open()
        WalletService.transfer({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.init()
          this.fetch()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      toogleWalletDetails () {
        this.walletDetailsActive = !this.walletDetailsActive
      }
    },

    components: {
      formErrors
    },

    validations: {
      formData: {
        from: from,
        amount: transferAmount({}),
        to: to
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
