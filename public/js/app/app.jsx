'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { WebContextProvider } from './context/WebContext'
import { uncompressData } from './context/compress'
import StudentViewCourseDev from './pages/StudentViewCourseDev'
import Archive from './pages/Archive'

import '../../css/kursutveckling-web.scss'

function appFactory(applicationStore, context) {
  return (
    <WebContextProvider configIn={context}>
      <Routes>
        <Route exact path="/:courseCode" element={<StudentViewCourseDev />} />
        <Route exact path="/:courseCode/arkiv" element={<Archive />} />
      </Routes>
    </WebContextProvider>
  )
}

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'

  if (!isClientSide) {
    return
  }

  const webContext = {}
  uncompressData(webContext)

  const basename = webContext.proxyPrefixPath.uri

  const app = <BrowserRouter basename={basename}>{appFactory({}, webContext)}</BrowserRouter>

  const domElement = document.getElementById('app')
  ReactDOM.hydrate(app, domElement)
}

_renderOnClientSide()

export default appFactory
