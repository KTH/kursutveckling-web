import React from 'react'
import Table from './Table'
import LinkToValidSyllabus from '../components/LinkToValidSyllabusPdf'

const createRow = (translation, syllabusPeriodStart, endPeriod) => {
  const startTermLabel = `${translation.course_short_semester[syllabusPeriodStart.substring(4, 5)]} ${syllabusPeriodStart.substring(0, 4)}`
  const endTermLabel = `${translation.course_short_semester[endPeriod.substring(4, 5)] || ''} ${endPeriod.substring(0, 4)}`
  const semestersLabel = `${startTermLabel} – ${endTermLabel.trim() || translation.ongoing_label}`

  return [semestersLabel, <LinkToValidSyllabus semester={syllabusPeriodStart} />]
}

const SyllabusTable = ({ translation, syllabusPeriods = {} }) => {
  const syllabusStartPeriod = Object.keys(syllabusPeriods || [])
  syllabusStartPeriod.sort().reverse()

  const syllabusDataRows = syllabusStartPeriod.map((syllabusPeriodStart) => {
    const { endPeriod } = syllabusPeriods[syllabusPeriodStart]
    return createRow(translation, syllabusPeriodStart, String(endPeriod))
  })
  const headings = { labels: [translation.label_semester, translation.label_syllabus], classes: ['semester', ''] }

  return (
    <>
      <h2>{translation.label_syllabuses}</h2>
      {syllabusDataRows.length ? (
        <Table headings={headings} rows={syllabusDataRows} tableClasses={['table', 'archive-table']} />
      ) : (
        <p className="inline-information">{translation.no_syllabuses}</p>
      )}
    </>
  )
}

export default SyllabusTable
