<template lang="pug">
  footer {{ sitename[language] }} ALL RIGHTS RESERVED.
</template>

<script>
import { mapState } from 'vuex'
import { SITENAME } from '@/xhrConfig'

export default {
  name: 'body-footer',

  data () {
    return {
      sitename: SITENAME
    }
  },

  computed: mapState({
    language: state => {
      return state.USER.language
    }
  })
}
</script>

<style lang="css" scoped>
  footer {
    padding: .5em 0;
    font-size: .75em;
    text-align: center;
  }
</style>
