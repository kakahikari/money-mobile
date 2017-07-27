<template lang="pug">
  ol.form-errors.form-group(v-if="errors.$error")
    form-error(v-if="typeof(errors.required) !== 'undefined' && !errors.required") {{ $root.i18n('required') }}
    form-error(v-if="typeof(errors.alphaNum) !== 'undefined' && !errors.alphaNum") {{ $root.i18n('must be characters or numbers') }}
    form-error(v-if="typeof(errors.numberOnly) !== 'undefined' && !errors.numberOnly") {{ $root.i18n('must be 4 numbers') }}
    form-error(v-if="typeof(errors.mathOnly) !== 'undefined' && !errors.mathOnly") {{ $root.i18n('must be numbers') }}
    form-error(v-if="typeof(errors.lowerCaseOnly) !== 'undefined' && !errors.lowerCaseOnly") {{ $root.i18n('must be lowercase') }}
    form-error(v-if="typeof(errors.sameAsPassword) !== 'undefined' && !errors.sameAsPassword") {{ $root.i18n('please confirm again') }}
    form-error(v-if="typeof(errors.differentFrom) !== 'undefined' && !errors.differentFrom") {{ $root.i18n('must be different') }}
    slot
</template>

<script>
  import formError from './form-error'

  export default {
    name: 'form-errors',

    props: {
      errors: {
        default: {}
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
