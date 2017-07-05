<template lang="pug">
  i.material-icons(aria-hidden="true") {{ name }}
</template>

<script>
  export default {
    name: 'icons',

    props: {
      name: {
        type: String,
        default: 'user'
      }
    }
  }
</script>

<style lang="css" scoped>
  @import "~material-design-icons/iconfont/material-icons.css";
</style>
