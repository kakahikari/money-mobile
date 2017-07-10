<template lang="pug">
  section.layout__viewport
    body-header
    transition(name="slideDown")
      body-nav(v-if="bodyNavActive")
    section.layout__container(":class"="{'body-nav--show': bodyNavActive}")
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
  import bodyHeader from '@/components/body-header'
  import bodyNav from '@/components/body-nav'

  export default {
    name: 'body-contents',

    data () {
      return {
        scrollY: 0
      }
    },

    computed: {
      bodyNavActive () {
        return (this.scrollY < 40)
      }
    },

    created () {
      this.$store.dispatch('checkStatus')
    },

    mounted () {
      this.$nextTick(() => {
        this.scrollHandler()
      })
    },

    methods: {
      scrollHandler () {
        this.getScrollY = () => {
          const scrollY = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY
          return scrollY
        }
        this.onEvent = () => {
          window.clearTimeout(this.scrollTimer)
          this.scrollTimer = window.setTimeout(() => {
            this.scrollY = this.getScrollY()
          }, this.awaitTime)
        }
        this.onEvent()
        document.addEventListener('DOMContentLoaded', () => this.onEvent())
        document.addEventListener('scroll', () => this.onEvent())
      }
    },

    components: {
      bodyHeader,
      bodyNav
    }
  }
</script>
