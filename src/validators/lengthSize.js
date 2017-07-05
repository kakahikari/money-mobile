Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = (min, max) => {
  return (value) => {
    if (Array.isArray(value)) return value.length >= min && value.length >= max

    return String(value).length >= min && String(value).length <= max
  }
}
