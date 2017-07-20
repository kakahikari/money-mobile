<template lang="pug">
  .node
    div(@click="toogleActive()")
      mt-cell(":title"="legend" ":label"="label")
        icon(name="expand_more")
    transition(name="slideUp")
      .content(v-if="isActive")
        .time {{ $root.i18n('Send time') }}: {{ sendDate }}
        .text {{ content }}
        .actions
          mt-button(size="small" @click="pop()") {{ $root.i18n('Delete') }}
</template>

<script>
  import MailService from 'hq-money-services/mailService'
  import Vue from 'vue'
  import { Cell, Button, MessageBox } from 'mint-ui'
  Vue.component(Cell.name, Cell)
  Vue.component(Button.name, Button)

  export default {
    name: 'mail__node',

    data () {
      return {
        isActive: false
      }
    },

    props: {
      legend: '',
      content: '',
      id: '',
      sendDate: '',
      status: '',
      filter: ''
    },

    computed: {
      label () {
        if (this.status === '0') return this.$root.i18n('Unread')
        return ''
      }
    },

    watch: {
      isActive (val) {
        if (val && this.status === '0') this.read()
      },
      filter () {
        this.isActive = false
      }
    },

    methods: {
      toogleActive () {
        this.isActive = !this.isActive
      },
      read () {
        MailService.read({context: this, body: {id: this.id}}).catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      },
      pop () {
        MessageBox({
          showCancelButton: true,
          confirmButtonText: this.$root.i18n('Confirm'),
          cancelButtonText: this.$root.i18n('Cancel'),
          title: '',
          message: this.$root.i18n('Are you sure?')
        }).then(action => {
          if (action === 'confirm') {
            MailService.pop({context: this, body: {id: this.id}}).then((res) => {
              this.$root.showToast({content: this.$root.i18n('success')})
              this.$emit('pop')
            }).catch((err) => {
              this.$root.showToast({type: 'warning', content: err})
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
