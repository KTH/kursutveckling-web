import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import i18n from '../../../../i18n'

@inject(['archiveStore'])
@observer
class Archive extends Component {
  render() {
    const { archiveStore } = this.props
    const { userLang } = archiveStore
    const translation = i18n.message('archiveTitles', userLang)

    return (
      <main>
        <h1>{translation.archive_header}</h1>
      </main>
    )
  }
}

export default Archive
