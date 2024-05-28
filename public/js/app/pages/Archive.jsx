import React from 'react'

import { Col, Row } from 'reactstrap'

import ArchiveSideMenu from '../components/ArchiveSideMenu'
import ArchivePageHeader from '../components/ArchivePageHeader'
import { useWebContext } from '../context/WebContext'

import i18n from '../../../../i18n'
import SyllabusTable from '../components/SyllabusTable'
import MemoTable from '../components/MemoTable'
import AnalysisTable from '../components/AnalysisTable'

const Archive = () => {
  const [context] = useWebContext()
  const { courseCode, courseKoppsData, courseMemos, subHeadline, userLang } = context
  const translation = i18n.message('archiveTitles', userLang)
  return (
    <Row>
      <ArchiveSideMenu translation={translation} courseCode={courseCode} />
      <Col id="mainContent" className="archive-page">
        <ArchivePageHeader
          translation={translation}
          subHeadline={subHeadline}
          courseCode={courseCode}
          language={userLang}
        />
        <main>
          <SyllabusTable
            translation={translation}
            courseCode={courseCode}
            language={userLang}
            syllabusPeriods={courseKoppsData.syllabusPeriods}
          />
          <MemoTable translation={translation} courseCode={courseCode} language={userLang} courseMemos={courseMemos} />
          <AnalysisTable translation={translation} />
        </main>
      </Col>
    </Row>
  )
}

export default Archive
