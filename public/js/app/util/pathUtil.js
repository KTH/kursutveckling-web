function _addParamToPath (path, param, value) {
  const paramToReplace = ':' + param
  return path.replace(paramToReplace, value)
}

module.exports = {
  addParamToPath: _addParamToPath
}
