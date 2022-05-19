import React, { useState, useReducer } from 'react'
import { SYLLABUS_URL } from '../util/constants'
import i18n from '../../../../i18n'
import { useWebContext } from '../context/WebContext'

const paramsReducer = (state, action) => ({ ...state, ...action })

function LinkToValidSyllabusPdf(props) {

  const { startDate, lang } = props

  const [ context ] = useWebContext()

  const [state, setState] = useReducer(paramsReducer, {
    startDate,
    lang,
  })
  
  const { courseCode, syllabusPeriods } = context.courseKoppsData

  const {
    course_short_semester: courseShortSemester,
    label_syllabus_link: labelSyllabusLink
  } = i18n.messages[lang === 'en' ? 0 : 1].pageTitles

  if (!syllabusPeriods[startDate]) {
    // eslint-disable-next-line no-console
    console.log(
      'Couldn’t find syllabusPeriod with key startDate for in syllabusPeriods',
      startDate,
      syllabusPeriods
    )
  }
  const syllabusPeriod = syllabusPeriods[startDate] || { endDate: '' }
  const endDate = syllabusPeriod.endDate.toString()

  const startTermName = `${courseShortSemester[startDate.substring(4, 5)]}${startDate.substring(
    0,
    4
  )}`
  const endTermName = `${courseShortSemester[endDate.substring(4, 5)] || ''}${endDate.substring(
    0,
    4
  )}`
  const coursePlanLabel = `${labelSyllabusLink} ${courseCode} ( ${startTermName} - ${endTermName} )`

  return (
    <p key={'link-syllabus-from-' + startDate}>
      <a
        aria-label={`PDF ${coursePlanLabel}`}
        href={`${SYLLABUS_URL}${courseCode}-${startDate}.pdf?lang=${lang}`}
        target="_blank"
        rel="noreferrer"
        className="pdf-link"
      >
        {coursePlanLabel}
      </a>
    </p>
  )

}

export default LinkToValidSyllabusPdf
