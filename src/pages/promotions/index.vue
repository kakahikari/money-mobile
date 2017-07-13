<template lang="pug">
  section
    .node(v-for="node in list")
      router-link(":to"="{name: 'Promotions-detail', params: { legend: node.legend}}")
        img.node__img(v-lazy="node.src")
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Lazyload } from 'mint-ui'
  Vue.use(Lazyload)

  export default {
    name: 'promotions',

    data () {
      return {
        types: [
          {type: 'all', legend: this.$root.i18n('All')}
        ]
      }
    },

    computed: mapState({
      list: state => state.PROMOTE.list
    }),

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        this.$store.dispatch('getPromotes', {context: this}).then((res) => {
          // 處理types
        }).catch((err) => {
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
