import React from 'react'

const ArchiveContext = React.createContext()
const defaultConfig = {
  lang: 'sv',
  isAdmin: false,
}

export const ArchiveContextProvider = props => {
  const { configIn = {} } = props
  const config = { ...defaultConfig }
  for (const k in configIn) {
    if (Object.prototype.hasOwnProperty.call(configIn, k)) {
      if (typeof configIn[k] === 'object') {
        config[k] = JSON.parse(JSON.stringify(configIn[k]))
      } else {
        config[k] = configIn[k]
      }
    }
  }

  const [currentConfig, setConfig] = React.useState(config)
  const value = [currentConfig, setConfig]
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ArchiveContext.Provider value={value} {...props} />
}

export function useArchiveContext() {
  const context = React.useContext(ArchiveContext)
  if (!context) {
    throw new Error('useArchiveContext must be used within a ArchiveContext')
  }
  return context
}
