<template lang="pug">
  section.form
    .form__fields
      mt-field(":label"="$root.i18n('Account')" ":readonly"="true" v-model="formData.username")
      mt-field(":label"="$root.i18n('Name')" ":readonly"="!!user.playername" v-model="formData.playername")
    .form__fields
      mt-radio(":title"="$root.i18n('Gender')" ":options"="genderOptions" ":readonly"="!!user.gender" v-model="formData.gender")
    .form__fields
      mt-field(":label"="$root.i18n('E-mail')" ":readonly"="!!user.email" v-model="formData.email" type="email")
      mt-field(":label"="$root.i18n('Mobile')" ":readonly"="!!user.mobile" v-model="formData.mobile" type="tel")
      mt-field(":label"="$root.i18n('QQ')" ":readonly"="!!user.qq" v-model="formData.qq")
      mt-field(":label"="$root.i18n('Wechat')" ":readonly"="!!user.wechat" v-model="formData.wechat")
      mt-field(":label"="$root.i18n('Address')" ":readonly"="!!user.addr" v-model="formData.addr")
      div(@click="openPicker()")
        mt-field(":label"="$root.i18n('Birthday')" ":readonly"="true" v-model="formData.birthday")
      mt-datetime-picker(ref="picker" type="date" ":startDate"="new Date(1900, 0, 1)" ":endDate"="new Date()" @confirm="birthdayChange")
    .form__actions
      mt-button.form__actions__btn(type="primary" plain @click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(plain @click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import moment from 'moment'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Field, Radio, Button, DatetimePicker, Indicator } from 'mint-ui'
  Vue.component(Field.name, Field)
  Vue.component(Radio.name, Radio)
  Vue.component(Button.name, Button)
  Vue.component(DatetimePicker.name, DatetimePicker)

  export default {
    name: 'account__edit-profile',

    data () {
      return {
        birthday: '',
        formData: {
          username: '',
          playername: '',
          gender: '',
          email: '',
          mobile: '',
          qq: '',
          wechat: '',
          addr: '',
          birthday: ''
        }
      }
    },

    computed: mapState({
      user: function (state) {
        return state.USER
      },
      genderOptions: function () {
        return [
          { label: this.$root.i18n('male'), value: '0', disabled: this.user.gender !== '' },
          { label: this.$root.i18n('female'), value: '1', disabled: this.user.gender !== '' }
        ]
      }
    }),

    watch: {
      birthday (val) {
        this.formData.birthday = moment(val).format('YYYY-MM-DD')
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.fetch()
      })
    },

    methods: {
      fetch () {
        Indicator.open()
        this.$store.dispatch('setUser', {context: this}).then((res) => {
          this.init()
          Indicator.close()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      init () {
        this.formData = {
          username: this.user.username,
          playername: this.user.playername,
          gender: this.user.gender,
          email: this.user.email,
          mobile: this.user.mobile,
          qq: this.user.qq,
          wechat: this.user.wechat,
          addr: this.user.addr,
          birthday: this.user.birthday
        }
      },
      action (formData) {
        Indicator.open()
        UserService.update({context: this, body: formData}).then((res) => {
          Indicator.close()
          this.$root.showToast({content: this.$root.i18n('success')})
          this.fetch()
        }).catch((err) => {
          Indicator.close()
          this.$root.showToast({type: 'warning', content: this.$root.i18n(err)})
        })
      },
      openPicker () {
        if (this.user.birthday === '') this.$refs.picker.open()
      },
      birthdayChange (val) {
        this.formData.birthday = moment(val).format('YYYY-MM-DD')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
