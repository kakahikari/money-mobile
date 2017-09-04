import numeral from 'numeral'
import i18next from 'i18next'
import resBundle from 'i18next-resource-store-loader?overrideDir=override&baseDir=base!../assets/i18n/index.js'
import { LANGUAGE, NUMBER_FORMAT } from '@/siteConfig'

String.prototype.currency = function ({sign = '', format = NUMBER_FORMAT}) {
  const out = numeral(this).format(sign + format)
  return out
}

String.prototype.toNumber = function ({format = NUMBER_FORMAT}) {
  const out = numeral(this).format(format)
  return out
}

i18next.init({
  lng: LANGUAGE,
  resources: resBundle
})

const env = process.env.NODE_ENV

export default {
  log (val) {
    if (env === 'development') {
      console.log(val)
    }
  },
  i18n (str, lng = LANGUAGE) {
    return i18next.t(str, {lng: lng})
  }
}
