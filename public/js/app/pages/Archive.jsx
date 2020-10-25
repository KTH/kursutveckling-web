import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ArchiveSideMenu from '../components/ArchiveSideMenu'
import ArchivePageHeader from '../components/ArchivePageHeader'

import i18n from '../../../../i18n'
import { Col, Row } from 'reactstrap'
import SyllabusTable from '../components/SyllabusTable'

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
            <ArchivePageHeader
              translation={translation}
              subHeadline={archiveStore.subHeadline}
              courseCode={archiveStore.courseCode}
              language={userLang}
            />
            <main id="mainContent">
              <SyllabusTable
                translation={translation}
                courseCode={archiveStore.courseCode}
                language={userLang}
                syllabusPeriods={archiveStore.courseKoppsData.syllabusPeriods}
              />
            </main>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default Archive
