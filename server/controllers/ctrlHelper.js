const parseOrSetEmpty = (value, language, setEmpty = false) => {
  return value ? value : ''
}

module.exports = {
  parseOrSetEmpty
}
