<template lang="pug">
section.deposit
  mt-cell(":title"="$root.i18n('Bank deposit')" is-link ":to"="{name: 'Bank-deposit'}" v-if="checkFunctionEnable('bank')")
  mt-cell(":title"="$root.i18n('Online deposit')" is-link ":to"="{name: 'Online-deposit'}" v-if="checkFunctionEnable('online')")
  mt-cell(":title"="$root.i18n('Weixin deposit')" is-link ":to"="{name: 'Weixin-deposit'}" v-if="checkFunctionEnable('weixin')")
</template>

<script>
import Vue from 'vue'
import { Cell } from 'mint-ui'
import { SITE_FUNCTIONS } from '@/siteConfig'
Vue.component(Cell.name, Cell)

export default {
  name: 'deposit',

  data () {
    return {
      siteFunctions: SITE_FUNCTIONS
    }
  },

  methods: {
    checkFunctionEnable (functionName) {
      let target = this.siteFunctions.filter(node => node.name === 'deposit')
      if (!target.length > 0) return false
      let targetFunction = target[0].functions.filter(node => node.name === functionName)
      if (targetFunction.length > 0) return targetFunction[0].enable
      return false
    }
  }
}
</script>
