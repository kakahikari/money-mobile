import numeral from 'numeral'
import translation from '@/locales'
import i18next from 'i18next'
import { LANGUAGE } from '@/xhrConfig'

String.prototype.currency = function ({sign = '', format = '0,0.00'}) {
  const out = numeral(this).format(sign + format)
  return out
}

String.prototype.toNumber = function ({format = '0.00'}) {
  const out = numeral(this).format(format)
  return out
}

i18next.init({
  lng: LANGUAGE,
  resources: translation
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
