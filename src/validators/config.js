import { between, required, minLength, maxLength, sameAs, alphaNum, email } from 'vuelidate/lib/validators'
import { regEx, differentFrom, lengthSize } from 'src/validators'

export const username = {
  required,
  lengthSize: lengthSize(6, 16),
  lowerCaseOnly: regEx(/^[a-z0-9]+$/)
}

export const password = {
  required,
  alphaNum,
  lengthSize: lengthSize(6, 16)
}

export const withdrawPW = {
  required,
  numberOnly: regEx(/\d{4}$/)
}

export const checkPW = (sameVM) => {
  return {
    required,
    sameAsPassword: sameAs(sameVM)
  }
}

export const checkEmail = {
  // required,
  email
}

export const playerName = {
  required,
  // alpha: regEx(/^[a-zA-Z\s]+$/)
  // chineseOnly: regEx(/[\u4e00-\u9fa5]$/),
  lengthSize: lengthSize(2, 10)
}

export const mobile = {
  required,
  mathOnly: regEx(/^[0-9]*$/)
  // chineseMobile: regEx(/^1[34578]\d{9}$/)
}

export const date = {
  required,
  date: regEx(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/)
}

export const time = {
  required,
  time: regEx(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
}

export const amount = ({min = 0, max = 1000000}) => {
  return {
    required,
    mathOnly: regEx(/^[0-9]*$/),
    between: between(min, max)
  }
}

export const account = {
  required,
  mathOnly: regEx(/^[0-9]*$/)
}

export const from = {
  required
}

export const to = {
  required,
  differentFrom: differentFrom('from')
}

export const bank = {
  required
}

export const orderNo = {
  required
}

export const bankName = {
  required
}

export const branch = {
  required
}

export const platform = {
  required
}
