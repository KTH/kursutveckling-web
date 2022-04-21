'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom' // matchPath

import { ArchiveContextProvider} from './context/ArchiveContext'
import { uncompressData} from './context/compress'
import { AdminContextProvider} from './context/AdminContext'

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
      <Switch>
        <ArchiveContextProvider configIn={context}>
          <Route path="/kursutveckling/:courseCode/arkiv" component={Archive} />
        </ArchiveContextProvider>
        <AdminContextProvider configIn={adminContext}>
          <Route path="/kursutveckling/:courseCode" component={StudentViewCourseDev} />
        </AdminContextProvider>
      </Switch>
  )

}
