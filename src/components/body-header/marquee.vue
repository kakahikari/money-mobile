<template lang="pug">
  .marquee
    .marquee__icon
      icon(name="volume_up")
    router-link.marquee__content(":to"="{name: 'Notice-list'}")
      mt-swipe(":auto"="10000" ":showIndicators"="false")
        template(v-for="node in marqueeList")
          mt-swipe-item {{ node.legend }}{{ node.content }}
    .marquee__close(@click="marqueeToggle()")
      icon(name="close")
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Swipe, SwipeItem } from 'mint-ui'
  Vue.component('mt-swipe', Swipe)
  Vue.component('mt-swipe-item', SwipeItem)

  export default {
    name: 'marquee',

    computed: mapState({
      marqueeList: state => state.PROMOTE.marquees
    }),

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        this.$store.dispatch('getMarquees', {context: this}).catch((err) => {
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      marqueeToggle () {
        this.$emit('marqueeToggle')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
