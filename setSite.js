let _SITE_CODE = process.argv[2]

let content =
`export const SITE_CODE = '${_SITE_CODE}'\n`

let scssColor =
`@import "sites/${_SITE_CODE}";\n`

let xhrResource = `hq_money_config/xhrConfig.js`
let siteResource = `hq_money_config/site_resource/${_SITE_CODE}`
let localesResource = `hq_money_config/locales/base`

var fs = require('graceful-fs')

let setConfig = () => {
  fs.writeFile('src/siteCode.js', content, 'utf-8', (err) => {
    if (err) throw err
    console.log(`
      ******************************
        > SITE_CODE: ${_SITE_CODE}
      ******************************
    `)
  })
  fs.writeFile('src/assets/scss/_setting.scss', scssColor, 'utf-8', (err) => {
    if (err) throw err
  })
  fs.createReadStream(xhrResource).pipe(fs.createWriteStream('src/xhrConfig.js'))
  fs.createReadStream(localesResource + '/cn/translation.json').pipe(fs.createWriteStream('src/assets/i18n/base/cn/translation.json'))
  fs.createReadStream(localesResource + '/en/translation.json').pipe(fs.createWriteStream('src/assets/i18n/base/en/translation.json'))
  fs.createReadStream(siteResource + '/siteConfig.js').pipe(fs.createWriteStream('src/siteConfig.js'))
  fs.createReadStream(siteResource + '/validatorsConfig.js').pipe(fs.createWriteStream('src/validators/config.js'))
  fs.createReadStream(siteResource + '/favicon.ico').pipe(fs.createWriteStream('static/favicon.ico'))
  fs.createReadStream(siteResource + '/logo.png').pipe(fs.createWriteStream('static/images/logo.png'))
}

setConfig()
