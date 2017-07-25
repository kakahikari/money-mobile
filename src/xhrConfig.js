export const xhrTimeout = 15000
export const LANGUAGE = 'cn'
export const CURRENCY = 'RMB'
export const GAMEGROUP = [
  {name: 'Cypress', id: '23'}
]
export const HOTGAMES = {
  groupId: '23',
  length: 9
}
export const SERVICELINK = 'https://tawk.to/chat/595c7e2de9c6d324a4738d9f/default/?$_tawk_popout=true'
export const SITENAME = {
  cn: '熊猫娱乐城',
  en: 'PANDA'
}

export const errorCodes = {
  '0': 'success',
  '1': 'format error',
  '2': 'unknown error',
  '1001': 'this account already exists',
  '1002': 'account contains Chinese characters or symbols',
  '1003': 'this email has been registered',
  '1004': 'this phone has been registered',
  '1005': 'please login first',
  '1006': 'please login first',
  '1007': 'suspended',
  '1008': 'password error',
  '1009': 'new password must be different from old password',
  '2001': 'this bank account has been registered',
  '2002': 'member deposit has been restricted',
  '2003': 'nonexistent account',
  '2004': 'deposit failed',
  '2005': 'withdrawal failed',
  '2006': 'withdrawal failed',
  '2007': 'withdrawal failed',
  '2008': 'one withdrawal remains incomplete',
  '3001': 'failed to load settings',
  '4001': 'you are quitting the game',
  '5005': 'please linking with bank card first',
  //
  'v-close': 'you are quitting the game',
  'v-game-group-not-open': 'this game platform has not been made available',
  'v-no-result': 'no data',
  'v-timeout': 'connection overtime',
  'v-need-withdrawPW': 'please set your withdrawal password',
  'v-need-profile': 'please setup your basic information',
  'v-no-token': 'login failed',
  'v-need-login': 'please login first',
  'v-no-group': 'this game platform not found',
  //
  'http-0': 'API server not responding (ERR_CONNECTION_REFUSED)',
  'http-404': 'API server not responding',
  'http-500': 'API connection error'
}

export const walletList = {
  '-1': 'System',
  '0': 'Center Wallet',
  '6': 'MG',
  '12': 'CQ9-GPS',
  '17': 'GT',
  '18': 'BBin',
  '23': 'CQ9'
}
