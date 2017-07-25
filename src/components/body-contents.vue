<template lang="pug">
  section.layout__viewport(":class"="{'marquee-active': marqueeActive}")
    body-header(@marqueeToggle="marqueeToggle")
    transition(name="slideDown")
      body-nav(v-if="bodyNavActive")
    section.layout__container
      router-view
    body-footer
</template>

<script>
  import bodyHeader from '@/components/body-header'
  import bodyNav from '@/components/body-nav'
  import bodyFooter from '@/components/body-footer'

  export default {
    name: 'body-contents',

    data () {
      return {
        scrollY: 0,
        marqueeActive: true
      }
    },

    computed: {
      bodyNavActive () {
        return (this.scrollY < 40 && !this.$route.meta.noMenu)
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
      },
      marqueeToggle (val) {
        this.marqueeActive = val
      }
    },

    components: {
      bodyHeader,
      bodyNav,
      bodyFooter
    }
  }
</script>
