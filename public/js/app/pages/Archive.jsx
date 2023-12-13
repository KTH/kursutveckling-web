import React, { useEffect } from 'react'

import { Col, Row } from 'reactstrap'

import ArchiveSideMenu from '../components/ArchiveSideMenu'
import ArchivePageHeader from '../components/ArchivePageHeader'
import { useWebContext } from '../context/WebContext'

import i18n from '../../../../i18n'
import SyllabusTable from '../components/SyllabusTable'
import MemoTable from '../components/MemoTable'
import AnalysisTable from '../components/AnalysisTable'
import { renderBreadcrumbsIntoKthHeader } from '../util/breadcrumbs'

const Archive = () => {
  const [context] = useWebContext()
  const { courseCode, courseKoppsData, courseMemos, subHeadline, userLang } = context
  const translation = i18n.message('archiveTitles', userLang)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      renderBreadcrumbsIntoKthHeader(courseCode, userLang)
    }
    return () => (isMounted = false)
  }, [])

  return (
    <Col>
      <Row>
        <ArchiveSideMenu translation={translation} courseCode={courseCode} />
        <Col>
          <ArchivePageHeader
            translation={translation}
            subHeadline={subHeadline}
            courseCode={courseCode}
            language={userLang}
          />
          <main id="mainContent">
            <SyllabusTable
              translation={translation}
              courseCode={courseCode}
              language={userLang}
              syllabusPeriods={courseKoppsData.syllabusPeriods}
            />
            <MemoTable
              translation={translation}
              courseCode={courseCode}
              language={userLang}
              courseMemos={courseMemos}
            />
            <AnalysisTable />
          </main>
        </Col>
      </Row>
    </Col>
  )
}

export default Archive
