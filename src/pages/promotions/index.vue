<template lang="pug">
  section
    .promotions-navbar
      template(v-for="node in types")
        .promotions-navbar-item(":class"="{active: filter === node.type }" @click="changeFilter(node.type)") {{ node.legend }}
    .promotions-content
      .node.list-item(v-for="node in list")
        router-link(":to"="{name: 'Promotions-detail', params: { legend: node.legend}}")
          img.node__img(v-lazy="node.src")
</template>

<script>
  import { mapState } from 'vuex'
  import { Indicator } from 'mint-ui'

  const dedup = (arr) => {
    let hashTable = {}

    return arr.filter(function (el) {
      const key = JSON.stringify(el)
      const match = Boolean(hashTable[key])
      if (match) {
        return false
      } else {
        hashTable[key] = true
        return hashTable[key]
      }
    })
  }

  export default {
    name: 'promotions',

    data () {
      return {
        types: [
          {type: 'all', legend: this.$root.i18n('All')}
        ],
        filter: 'all'
      }
    },

    computed: mapState({
      list: function (state) {
        if (this.filter === 'all') {
          return state.PROMOTE.list
        }
        return state.PROMOTE.list.filter(node => node.groupNo.toString() === this.filter)
      }
    }),

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        Indicator.open()
        this.$store.dispatch('getPromotes', {context: this}).then((res) => {
          const types = res.map((promote) => {
            let out = {}
            out.type = promote.groupNo.toString()
            out.legend = promote.group
            return out
          })
          this.types = this.types.concat(dedup(types))
          Indicator.close()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      changeFilter (val) {
        this.filter = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
