Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = (rule) => {
  return (value) => {
    return rule.test(value)
  }
}
