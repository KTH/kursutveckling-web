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

const formatSemesterName = (semester: string, courseShortSemester: Record<string, string>): string => {
  if (!semester) return ''
  const year = semester.substring(0, 4)
  const semesterCode = semester.substring(4, 5)
  const semesterName = courseShortSemester[semesterCode] || ''
  return `${semesterName} ${year}`
}

const LinkToValidSyllabusPdf: React.FC<{
  semester: string
}> = ({ semester }) => {
  const [{ courseKoppsData, userLang }] = useWebContext()
  const { courseCode, syllabusPeriods } = courseKoppsData

  const syllabusPeriodStart = getSyllabusPeriodStart(syllabusPeriods, semester)

  const translate = i18n.messages[userLang === 'en' ? 0 : 1]
  const { syllabusLink, courseShortSemester } = translate.tableHeaders
  const { label } = syllabusLink

  if (!syllabusPeriods[syllabusPeriodStart]) {
    console.log(
      'Couldn’t find syllabusPeriod with key startDate for syllabusPeriods',
      syllabusPeriodStart,
      syllabusPeriods
    )
  }

  const syllabusPeriod = syllabusPeriods[syllabusPeriodStart]
  const startTermName = formatSemesterName(syllabusPeriodStart, courseShortSemester)
  const endTermName = formatSemesterName(syllabusPeriod.endDate || '', courseShortSemester)
  const syllabusLabel = `${label} ${courseCode} (${startTermName} - ${endTermName})`

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
