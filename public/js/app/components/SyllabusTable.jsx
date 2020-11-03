import React from 'react'
import { Alert } from 'reactstrap'

import { SYLLABUS_URL } from '../util/constants'

const row = (translation, courseCode, language, startDate, endDate) => {
  const startTermLabel = `${
    translation.course_short_semester[startDate.substring(4, 5)]
  } ${startDate.substring(0, 4)}`
  const endTermLabel = `${
    translation.course_short_semester[endDate.substring(4, 5)] || ''
  } ${endDate.substring(0, 4)}`
  const semestersLabel = `${startTermLabel} – ${endTermLabel.trim() || translation.ongoing_label}`
  const courseSyllabusLabel = `${translation.label_syllabus} ${courseCode} (${startTermLabel} – ${endTermLabel})`

  return (
    <tr key={`syllabus-${startDate}-${endDate}`}>
      <td>{semestersLabel}</td>
      <td>
        <a
          aria-label={`PDF ${courseSyllabusLabel}`}
          href={`${SYLLABUS_URL}${courseCode}-${startDate}.pdf?lang=${language}`}
          target="_blank"
          rel="noreferrer"
          className="pdf-link"
        >
          {courseSyllabusLabel}
        </a>
      </td>
    </tr>
  )
}

const SyllabusTable = ({ translation, courseCode, language, syllabusPeriods = {} }) => {
  const startDates = Object.keys(syllabusPeriods) || []
  startDates.sort().reverse()
  return (
    <>
      <h2>{translation.label_syllabuses}</h2>
      {startDates.length ? (
        <table className="table archive-table">
          <thead>
            <tr>
              <th scope="col">{translation.label_semesters}</th>
              <th scope="col" className="course-syllabus-header">
                {translation.label_syllabus}
              </th>
            </tr>
          </thead>
          <tbody>
            {startDates.map((startDate) => {
              const { endDate: ed } = syllabusPeriods[startDate]
              const endDate = ed.toString()
              return row(translation, courseCode, language, startDate, endDate)
            })}
          </tbody>
        </table>
      ) : (
        <p className="inline-information">{translation.no_syllabuses}</p>
      )}
    </>
  )
}

export default SyllabusTable
