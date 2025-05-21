import React from 'react'

import { Col, Row } from 'reactstrap'

import ArchiveSideMenu from '../components/ArchiveSideMenu'
import PageTitle from '../components/PageTitle'
import { useWebContext } from '../context/WebContext'

import i18n from '../../../../i18n'
import SyllabusTable from '../components/SyllabusTable'
import MemoTable from '../components/MemoTable'
import AnalysisTable from '../components/AnalysisTable'

const Archive = () => {
  const [context] = useWebContext()
  const { courseCode, courseKoppsData, courseMemos, analysisDataAdminWeb, userLang } = context
  const translation = i18n.message('archiveTitles', userLang)
  return (
    <Row>
      <ArchiveSideMenu translation={translation} courseCode={courseCode} />
      <Col id="mainContent" className="archive-page">
        <PageTitle courseData={courseData} pageTitle={translation.archive} />
        <main>
          <SyllabusTable translation={translation} syllabusPeriods={courseKoppsData.syllabusPeriods} />
          <MemoTable translation={translation} courseMemos={courseMemos} />
          <AnalysisTable translation={translation} analyses={analysisDataAdminWeb} />
        </main>
      </Col>
    </Row>
  )
}

export default Archive
