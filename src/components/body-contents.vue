<template lang="pug">
  section.layout__viewport
    section.layout__container
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
  export default {
    name: 'body-contents',

    created () {
      this.$store.dispatch('checkStatus')
    }
  }
</script>
