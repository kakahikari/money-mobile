<template lang="pug">
  section.detail(v-if="target !== null")
    h3.detail__title {{ target.legend }}
    .detail__content(v-html="target.content")
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'dromotions__detail',

    computed: mapState({
      list: function (state) {
        return state.PROMOTE.list
      },
      target () {
        let out = this.list.filter(node => node.legend === this.$route.params.legend)
        if (out.length > 0) return out[0]
        return null
      }
    }),

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        this.$store.dispatch('getPromotes', {context: this}).catch((err) => {
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
