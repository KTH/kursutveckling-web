import React from 'react'

import { SYLLABUS_URL } from '../util/constants'
import Table from './Table'

const row = (translation, courseCode, language, startDate, endDate) => {
  const startTermLabel = `${translation.course_short_semester[startDate.substring(4, 5)]} ${startDate.substring(0, 4)}`
  const endTermLabel = `${translation.course_short_semester[endDate.substring(4, 5)] || ''} ${endDate.substring(0, 4)}`
  const semestersLabel = `${startTermLabel} – ${endTermLabel.trim() || translation.ongoing_label}`
  const courseSyllabusLabel = `${translation.label_syllabus} ${courseCode} (${startTermLabel} – ${endTermLabel})`

  return [
    semestersLabel,
    <a
      aria-label={`PDF ${courseSyllabusLabel}`}
      href={`${SYLLABUS_URL}${courseCode}-${startDate}.pdf?lang=${language}`}
      target="_blank"
      rel="noreferrer"
      className="pdf-link"
    >
      {courseSyllabusLabel}
    </a>
  ]
}

const SyllabusTable = ({ translation, courseCode, language, syllabusPeriods = {} }) => {
  const startDates = Object.keys(syllabusPeriods) || []
  startDates.sort().reverse()

  const syllabusDataRows = startDates.map((startDate) => {
    const { endDate: ed } = syllabusPeriods[startDate]
    const endDate = ed.toString()
    return row(translation, courseCode, language, startDate, endDate)
  })

  return (
    <>
      <h2>{translation.label_syllabuses}</h2>
      {syllabusDataRows.length ? (
        <Table
          headings={[translation.label_semesters, translation.label_syllabus]}
          rows={syllabusDataRows}
          tableClasses={['table', 'archive-table']}
        />
      ) : (
        <p className="inline-information">{translation.no_syllabuses}</p>
      )}
    </>
  )
}

export default SyllabusTable
