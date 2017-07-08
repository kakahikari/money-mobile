<template lang="pug">
  section.layout__viewport
    body-header
    section.layout__container
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
  import bodyHeader from '@/components/body-header'

  export default {
    name: 'body-contents',

    created () {
      this.$store.dispatch('checkStatus')
    },

    components: {
      bodyHeader
    }
  }
</script>
