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
      <>
        <header role="presentation">
          <h1 id="page-heading" aria-labelledby="page-heading page-sub-heading">
            {translation.archive_header}
          </h1>
          <div>
            <p id="page-sub-heading" aria-hidden="true">
              {archiveStore.subHeadline}
            </p>
          </div>
        </header>
        <main />
      </>
    )
  }
}

export default Archive
