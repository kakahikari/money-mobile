<template lang="pug">
  ol.form-errors.form-group(v-if="errors.$error")
    form-error(v-if="typeof(errors.required) !== 'undefined' && !errors.required") {{ $root.i18n('required') }}
    form-error(v-if="typeof(errors.alphaNum) !== 'undefined' && !errors.alphaNum") {{ $root.i18n('must be characters or numbers') }}
    form-error(v-if="typeof(errors.numberOnly) !== 'undefined' && !errors.numberOnly") {{ $root.i18n('must be 4 numbers') }}
    form-error(v-if="typeof(errors.mathOnly) !== 'undefined' && !errors.mathOnly") {{ $root.i18n('must be numbers') }}
    form-error(v-if="typeof(errors.lowerCaseOnly) !== 'undefined' && !errors.lowerCaseOnly") {{ $root.i18n('must be lowercase') }}
    form-error(v-if="typeof(errors.sameAsPassword) !== 'undefined' && !errors.sameAsPassword") {{ $root.i18n('please confirm again') }}
    form-error(v-if="typeof(errors.differentFrom) !== 'undefined' && !errors.differentFrom") {{ $root.i18n('must be different') }}
    form-error(v-if="typeof(errors.chineseOnly) !== 'undefined' && !errors.chineseOnly") {{ $root.i18n('must be chinese characters') }}
    form-error(v-if="typeof(errors.chineseMobile) !== 'undefined' && !errors.chineseMobile") {{ $root.i18n('mobile format error') }}
    form-error(v-if="typeof(errors.between) !== 'undefined' && !errors.between") {{ $root.i18n('must between') }} {{ currency }} {{ errors.$params.between.min.toString() | currency }} ~ {{ errors.$params.between.max.toString() | currency}}
    template(v-if="typeof(errors.minLength) !== 'undefined' || typeof(errors.maxLength) !== 'undefined'")
      form-error {{ $root.i18n('the character must have') }} {{ errors.$params.minLength.min }} ~ {{ errors.$params.maxLength.max }}
    slot
</template>

<script>
  import formError from './form-error'
  import { CURRENCY } from '@/siteConfig'

  export default {
    name: 'form-errors',

    props: {
      errors: {
        default: {}
      }
    },

    data () {
      return {
        currency: CURRENCY
      }
    },

    components: {
      formError
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
