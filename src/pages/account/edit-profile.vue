<template lang="pug">
  section.form.edit
    .form__fields
      mt-field(":label"="$root.i18n('Account')" ":readonly"="true" v-model="formData.username")
      mt-field(":label"="$root.i18n('Name')" ":readonly"="!!user.playername" v-model="formData.playername")
      form-errors(":errors"="$v.formData.playername")
    .form__fields(v-if="checkFunctionEnable('gender')")
      mt-radio(":title"="$root.i18n('Gender')" ":options"="genderOptions" ":readonly"="!!user.gender" v-model="formData.gender")
    .form__fields
      mt-field(":label"="$root.i18n('E-mail')" ":readonly"="!!user.email" v-model="formData.email" type="email" v-if="checkFunctionEnable('email')")
      form-errors(":errors"="$v.formData.email")
      mt-field(":label"="$root.i18n('Mobile')" ":readonly"="!!user.mobile" v-model="formData.mobile" type="tel" v-if="checkFunctionEnable('mobile')")
      form-errors(":errors"="$v.formData.mobile")
      mt-field(":label"="$root.i18n('QQ')" v-model="formData.qq" v-if="checkFunctionEnable('qq')")
      mt-field(":label"="$root.i18n('Wechat')" v-model="formData.wechat" v-if="checkFunctionEnable('wechat')")
      mt-field(":label"="$root.i18n('Pin BB')" v-model="formData.pin_bb" v-if="checkFunctionEnable('pin_bb')")
      mt-field(":label"="$root.i18n('Address')" v-model="formData.addr" v-if="checkFunctionEnable('address')")
      div(v-if="checkFunctionEnable('birthday')")
        div(@click="openPicker()")
          mt-field(":label"="$root.i18n('Birthday')" ":readonly"="true" v-model="formData.birthday")
        form-errors(":errors"="$v.formData.birthday")
        mt-datetime-picker(ref="picker" type="date" ":startDate"="new Date(1900, 0, 1)" ":endDate"="today" v-model="today" @confirm="birthdayChange")
    .form__actions
      mt-button.form__actions__btn.submit(@click="action(formData)") {{ $root.i18n('Submit') }}
      mt-button.form__actions__btn(@click="init()") {{ $root.i18n('Reset') }}
</template>

<script>
  import UserService from 'hq-money-services/userService'
  import moment from 'moment'
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import formErrors from '@/components/form-errors'
  import { SITE_FUNCTIONS } from '@/siteConfig'
  import { playerName, date, checkEmail, mobile } from '@/validators/config'
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
          pin_bb: '',
          addr: '',
          birthday: ''
        },
        siteFunctions: SITE_FUNCTIONS
      }
    },

    computed: mapState({
      user: state => {
        return state.USER
      },
      genderOptions: function () {
        return [
          { label: this.$root.i18n('male'), value: '0', disabled: this.user.gender !== '' },
          { label: this.$root.i18n('female'), value: '1', disabled: this.user.gender !== '' }
        ]
      },
      today: () => {
        return moment().toDate()
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
          pin_bb: this.user.pinbb,
          addr: this.user.addr,
          birthday: this.user.birthday
        }
        this.$v.$reset()
      },
      action (formData) {
        this.$v.$touch()
        if (this.$v.$error) return

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
      },
      checkFunctionEnable (functionName) {
        let target = this.siteFunctions.filter(node => node.name === 'edit-profile')
        if (!target.length > 0) return false
        let targetFunction = target[0].functions.filter(node => node.name === functionName)
        if (targetFunction.length > 0) return targetFunction[0].enable
        return false
      }
    },

    components: {
      formErrors
    },

    validations: {
      formData: {
        playername: playerName({}),
        email: checkEmail,
        mobile,
        birthday: date
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
  .edit {
    padding-top: 10px;
  }
</style>
