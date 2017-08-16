<template lang="pug">
  section.deposit
    mt-cell(":title"="$root.i18n('Bank deposit')" is-link ":to"="{name: 'Bank-deposit'}")
    mt-cell(":title"="$root.i18n('Online deposit')" is-link ":to"="{name: 'Online-deposit'}")
    mt-cell(":title"="$root.i18n('Weixin deposit')" is-link ":to"="{name: 'Weixin-deposit'}")
</template>

<script>
  import Vue from 'vue'
  import { Cell } from 'mint-ui'
  Vue.component(Cell.name, Cell)

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
    }
  }
</script>
