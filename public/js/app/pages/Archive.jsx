import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { inject, observer } from 'mobx-react'
import { Breadcrumbs } from '@kth/kth-kip-style-react-components'
import { Col, Row } from 'reactstrap'

import ArchiveSideMenu from '../components/ArchiveSideMenu'
import ArchivePageHeader from '../components/ArchivePageHeader'

import i18n from '../../../../i18n'
import SyllabusTable from '../components/SyllabusTable'
import MemoTable from '../components/MemoTable'
import AnalysisTable from '../components/AnalysisTable'
import Table from '../components/Table'

import { getDateFormat } from '../util/helpers'

function renderBreadcrumbsIntoKthHeader(courseCode, language) {
  const breadcrumbContainer = document.getElementById('breadcrumbs-header')
  if (breadcrumbContainer)
    ReactDOM.render(
      <Breadcrumbs include="aboutCourse" courseCode={courseCode} language={language} />,
      breadcrumbContainer
    )
}

@inject(['archiveStore'])
@observer
class Archive extends Component {
  render() {
    const { archiveStore } = this.props
    const { courseCode, userLang } = archiveStore
    const translation = i18n.message('archiveTitles', userLang)
    renderBreadcrumbsIntoKthHeader(courseCode, userLang)

    return (
      <Col>
        <Row>
          <ArchiveSideMenu translation={translation} courseCode={courseCode} />
          <Col>
            <ArchivePageHeader
              translation={translation}
              subHeadline={archiveStore.subHeadline}
              courseCode={courseCode}
              language={userLang}
            />
            <main id="mainContent">
              <SyllabusTable
                translation={translation}
                courseCode={courseCode}
                language={userLang}
                syllabusPeriods={archiveStore.courseKoppsData.syllabusPeriods}
              />
              <MemoTable
                translation={translation}
                courseCode={courseCode}
                language={userLang}
                courseMemos={archiveStore.courseMemos}
              />
              <AnalysisTable />
            </main>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default Archive
