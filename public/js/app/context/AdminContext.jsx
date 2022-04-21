import React from 'react'

const AdminContext = React.createContext()
const defaultConfig = {
  adminData: { x: 123, y: 345 },
}

export const AdminContextProvider = props => {
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
  return <AdminContext.Provider value={value} {...props} />
}

export function useAdminContext() {
  const context = React.useContext(AdminContext)
  if (!context) {
    throw new Error('useAdminContext must be used within a AdminContext')
  }
  return context
}
