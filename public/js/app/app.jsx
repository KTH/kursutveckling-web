'use strict'
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // require('inferno-devtools')
}
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom' // matchPath
import { inject, Provider } from 'mobx-react'
import { StaticRouter } from 'react-router'

import { configure } from 'mobx'

import AdminStore from './stores/AdminStore'
import StudentViewCourseDev from './pages/StudentViewCourseDev'

import '../../css/kursutveckling-web.scss'

function appFactory() {
  if (process.env['NODE_ENV'] !== 'production') {
    configure({
      isolateGlobalState: true
    })
  }

  const adminStore = new AdminStore()
  if (typeof window !== 'undefined') {
    adminStore.initializeStore('adminStore')
  }
  // createUtility({
  //   implements: IMobxStore,
  //   name: 'AdminStore',
  //   store: adminStore
  // }).registerWith(globalRegistry)
  return (
    <Provider adminStore={adminStore}>
      {/* <ProgressLayer> */}
      <Switch>
        <Route path="/kursutveckling" component={StudentViewCourseDev} />
      </Switch>
      {/* </ProgressLayer> */}
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
