<template lang="pug">
  section
    template(v-for="node in marqueeList")
      node(":legend"="node.legend" ":content"="node.content")
</template>

<script>
  import node from './node'
  import { mapState } from 'vuex'

  export default {
    name: 'notice-list',

    computed: mapState({
      marqueeList: state => state.PROMOTE.marquees
    }),

    components: {
      node
    }
  }
</script>
