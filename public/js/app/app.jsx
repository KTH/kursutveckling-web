'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // matchPath

import { ArchiveContextProvider } from './context/ArchiveContext'
import { uncompressData } from './context/compress'
import { AdminContextProvider } from './context/AdminContext'

import '../../css/kursutveckling-web.scss'

//import StudentViewCourseDev from './pages/StudentViewCourseDev'
import Archive from './pages/Archive'

export default appFactory

_renderOnClientSide()

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  const archiveContext = {}
  uncompressData(archiveContext)

  const adminContext = {}
  uncompressData(adminContext, 'admin')

  const basename = archiveContext.proxyPrefixPath.uri

  const app = <BrowserRouter basename={basename}>{appFactory({}, archiveContext, adminContext)}</BrowserRouter>

  const domElement = document.getElementById('kth-kursinfo')
  ReactDOM.hydrate(app, domElement)
}

function appFactory(applicationStore, context, adminContext) {
  return (
    <Routes>
        <Route path="/:courseCode/arkiv" element={<ArchiveContextProvider configIn={context}><Archive /></ArchiveContextProvider>} />
    </Routes>
  //<Route path="/:courseCode" element={<AdminContextProvider configIn={adminContext}><StudentViewCourseDev /></AdminContextProvider>} />
)
}
