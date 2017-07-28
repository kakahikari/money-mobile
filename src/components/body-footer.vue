<template lang="pug">
  footer(@click="toogleVersion()") {{ sitename[language] }} ALL RIGHTS RESERVED.
    span.version(v-if="showVersion") v{{ version }}
</template>

<script>
import { mapState } from 'vuex'
import { SITENAME } from '@/siteConfig'
import { _VERSION } from 'src/version'

export default {
  name: 'body-footer',

  data () {
    return {
      sitename: SITENAME,
      version: _VERSION,
      showVersion: false
    }
  },

  computed: mapState({
    language: state => {
      return state.USER.language
    }
  }),

  methods: {
    toogleVersion () {
      this.showVersion = !this.showVersion
    }
  }
}
</script>

<style lang="css" scoped>
  footer {
    position: relative;
    padding: .5em 0;
    font-size: .75em;
    text-align: center;
  }
  .version {
    margin-left: 1em;
  }
</style>
