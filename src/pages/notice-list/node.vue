<template lang="pug">
  .node
    div(@click="toogleActive()")
      mt-cell(":title"="legend")
        icon(name="expand_more")
    transition(name="slideUp")
      .content(v-if="isActive") {{ content }}
</template>

<script>
  import Vue from 'vue'
  import { Cell } from 'mint-ui'
  Vue.component(Cell.name, Cell)

  export default {
    name: 'notice-list__node',

    data () {
      return {
        isActive: false
      }
    },

    props: {
      legend: '',
      content: ''
    },

    methods: {
      toogleActive () {
        this.isActive = !this.isActive
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
