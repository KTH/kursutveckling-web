'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // matchPath

import { ArchiveContextProvider } from './context/ArchiveContext'
import { uncompressData } from './context/compress'
import { AdminContextProvider } from './context/AdminContext'

import '../../css/kursutveckling-web.scss'

import StudentViewCourseDev from './pages/StudentViewCourseDev'
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
    // TODO: Kanske context utanför Routes, elle inne i element
    <Routes>
      <ArchiveContextProvider configIn={context}>
        <Route path="/:courseCode/arkiv" element={<Archive />} />
      </ArchiveContextProvider>
      <AdminContextProvider configIn={adminContext}>
        <Route path="/:courseCode" element={<StudentViewCourseDev />} />
      </AdminContextProvider>
    </Routes>
  )
}
