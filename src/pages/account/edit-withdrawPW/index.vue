<template lang="pug">
section.form.edit(v-if="withdrawPWChecked")
  update(v-if="$store.state.AUTH.isWithdrawPW")
  create(v-else)
</template>

<script>
  import { mapState } from 'vuex'
  import update from './update'
  import create from './create'

  export default {
    name: 'edit-withdrawPW',

    computed: mapState({
      withdrawPWChecked: state => state.AUTH.withdrawPWChecked,
      isWithdrawPW: state => state.AUTH.isWithdrawPW
    }),

    components: {
      update,
      create
    }
  }
</script>

<style lang="css" scoped>
.edit {
  padding-top: 10px;
}
</style>
