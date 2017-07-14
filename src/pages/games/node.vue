<template lang="pug">
  .node
    .node__img(@click="play()")
      img(v-lazy="src")
    .node__name {{ name }}
</template>

<script>
  import GameService from 'hq-money-services/gameService'
  import { Indicator } from 'mint-ui'

  export default {
    name: 'games__node',

    props: {
      name: { type: String },
      src: { type: String },
      id: { type: String },
      groupId: { type: String }
    },

    methods: {
      play () {
        let formData = {
          gameId: this.id,
          groupId: this.groupId
        }
        Indicator.open()
        GameService.slotPlay({context: this, body: formData}).then((res) => {
          Indicator.close()
          const open = window.open(res, '_blank')
          if (open == null || typeof (open) === 'undefined') {
            return this.$emit('no-blank', res)
          }
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './style';
</style>
