<template lang="pug">
  .balance-bar
    span {{ $root.i18n('Platform balance') }}:
    span.balance {{ balance.toString() | currency }}
</template>

<script>
  export default {
    name: 'game__balance-bar',

    props: {
      balance: {
        default: 0,
        type: Number
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style';
</style>
