import React from 'react'
import Table from './Table'
import LinkToValidSyllabus from '../components/LinkToValidSyllabusPdf'

const createRow = (translation, syllabusPeriodStart, endDate) => {
  const startTermLabel = `${translation.course_short_semester[syllabusPeriodStart.substring(4, 5)]} ${syllabusPeriodStart.substring(0, 4)}`
  const endTermLabel = `${translation.course_short_semester[endDate.substring(4, 5)] || ''} ${endDate.substring(0, 4)}`
  const semestersLabel = `${startTermLabel} – ${endTermLabel.trim() || translation.ongoing_label}`

  return [semestersLabel, <LinkToValidSyllabus semester={syllabusPeriodStart} />]
}

const SyllabusTable = ({ translation, syllabusPeriods = {} }) => {
  const syllabusPeriodStarts = Object.keys(syllabusPeriods) || []
  syllabusPeriodStarts.sort().reverse()

  const syllabusDataRows = syllabusPeriodStarts.map((syllabusPeriodStart) => {
    const { endDate: ed } = syllabusPeriods[syllabusPeriodStart]
    const endDate = ed.toString()
    return createRow(translation, syllabusPeriodStart, endDate)
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
