'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom' // matchPath
import { Provider } from 'mobx-react'
import { StaticRouter } from 'react-router'

import { configure } from 'mobx'

import AdminStore from './stores/AdminStore'
import ArchiveStore from './stores/ArchiveStore'
import StudentViewCourseDev from './pages/StudentViewCourseDev'
import Archive from './pages/Archive'

import '../../css/kursutveckling-web.scss'
import '../../img/arrow-black-down.svg'

function appFactory() {
  if (process.env.NODE_ENV !== 'production') {
    configure({
      isolateGlobalState: true
    })
  }

  const adminStore = new AdminStore()
  const archiveStore = new ArchiveStore()
  if (typeof window !== 'undefined') {
    adminStore.initializeStore('adminStore')
    archiveStore.initializeStore('archiveStore')
  }

  return (
    <Provider adminStore={adminStore} archiveStore={archiveStore}>
      <Switch>
        <Route path="/kursutveckling/:courseCode/arkiv" component={Archive} />
        <Route path="/kursutveckling/:courseCode" component={StudentViewCourseDev} />
      </Switch>
    </Provider>
  )
}

function staticRender(context, location) {
  return (
    <StaticRouter location={location} context={context}>
      {appFactory()}
    </StaticRouter>
  )
}

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <BrowserRouter>{appFactory()}</BrowserRouter>,
    document.getElementById('kth-kursinfo')
  )
}

export { appFactory, staticRender }
