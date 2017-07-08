<template lang="pug">
  div(":height"="height" ":width"="width")
    template(v-if="code!=''" v-for="n in code.split('')")
      span(":class"="'v-'+index[n]" ":style"="{width: 'calc('+width+'/'+code.length+')', height: height, backgroundSize: '100% calc('+height+'*10)'}")
</template>

<script>
  export default {
    name: 'v-verification2',

    data () {
      return {
        index: [ 'z', 'o', 't', 't2', 'f', 'f2', 's', 's2', 'e', 'n' ]
      }
    },

    props: {
      code: {
        type: String,
        required: true
      },
      height: String,
      width: String
    }
  }
</script>

<style lang="scss" scoped>
  @import './style';
</style>
