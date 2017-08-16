<template>
  <form name="autoSendForm" :action="params.url" method="post" target="blank">
    <template v-for="key in params.keys">
      <input type="hidden" :name="key.name" :value="key.value">
    </template>
  </form>
</template>

<script>
  export default {
    name: 'v-auto-send-form',

    data () {
      return {
        id: 'autoSendForm'
      }
    },

    props: {
      params: {
        default: {}
      }
    },

    mounted () {
      this.$nextTick(() => {
        document.autoSendForm.submit()
      })
    }
  }
</script>
