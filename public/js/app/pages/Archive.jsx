import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ArchiveSideMenu from '../components/ArchiveSideMenu'
import ArchivePageHeader from '../components/ArchivePageHeader'

import i18n from '../../../../i18n'
import { Col, Row } from 'reactstrap'

@inject(['archiveStore'])
@observer
class Archive extends Component {
  render() {
    const { archiveStore } = this.props
    const { userLang } = archiveStore
    const translation = i18n.message('archiveTitles', userLang)

    return (
      <Col>
        <Row>
          <ArchiveSideMenu translation={translation} courseCode={archiveStore.courseCode} />
          <Col>
            <ArchivePageHeader translation={translation} subHeadline={archiveStore.subHeadline} />
            <main id="mainContent" />
          </Col>
        </Row>
      </Col>
    )
  }
}

export default Archive
