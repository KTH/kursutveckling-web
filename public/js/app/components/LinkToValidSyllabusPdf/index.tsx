import React from 'react'
import { SYLLABUS_URL } from '../../util/constants'
import i18n from '../../../../../i18n'
import { useWebContext } from '../../context/WebContext'
import { SyllabusPeriods } from './types'

const getSyllabusPeriodStart = (periods: SyllabusPeriods, semester: string): string | null => {
  const semesterAsNumber = Number(semester)

  for (const [key, value] of Object.entries(periods)) {
    const keyAsNumber = parseInt(key, 10)
    const endDate = value.endDate ? Number(value.endDate) : Infinity

    if (semesterAsNumber >= keyAsNumber && semesterAsNumber <= endDate) {
      return key
    }
  }

  return null
}

const LinkToValidSyllabusPdf: React.FC<{
  semester: string
}> = ({ semester }) => {
  const [{ courseKoppsData, userLang }] = useWebContext()

  const { courseCode, syllabusPeriods } = courseKoppsData

  const syllabusPeriodStart = getSyllabusPeriodStart(syllabusPeriods, semester)

  const translate = i18n.messages[userLang === 'en' ? 0 : 1]
  const { label } = translate.tableHeaders.syllabusLink
  const { courseShortSemester } = translate.messages

  if (!syllabusPeriods[syllabusPeriodStart]) {
    console.log(
      'Couldn’t find syllabusPeriod with key startDate for syllabusPeriods',
      syllabusPeriodStart,
      syllabusPeriods
    )
  }
  const syllabusPeriod = syllabusPeriods[syllabusPeriodStart] || { endDate: '' }
  const endDate = syllabusPeriod.endDate?.toString() || ''

  const startTermName = `${courseShortSemester[syllabusPeriodStart.substring(4, 5)]} ${syllabusPeriodStart.substring(0, 4)}`
  const endTermName = `${courseShortSemester[endDate.substring(4, 5)] || ''}${endDate.substring(0, 4)}`
  const syllabusLabel = `${label} ${courseCode} ( ${startTermName} - ${endTermName} )`

  return (
    <a
      aria-label={`PDF ${syllabusLabel}`}
      href={`${SYLLABUS_URL}${courseCode}-${syllabusPeriodStart}.pdf?lang=${userLang}`}
      target="_blank"
      rel="noreferrer"
      className="pdf-link"
    >
      {syllabusLabel}
    </a>
  )
}

export default LinkToValidSyllabusPdf
