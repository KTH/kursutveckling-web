import React from 'react'
import { SYLLABUS_URL } from '../../util/constants'
import i18n from '../../../../../i18n'
import { useWebContext } from '../../context/WebContext'
import { SyllabusPeriods } from './types'
import ActiveOrDisabledLink from '../ActiveOrDisabledLink'

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

const formatSemesterName = (semester: string | number, courseShortSemester: Record<string, string>): string => {
  if (!semester) return ''
  const year = semester.toString().substring(0, 4)
  const semesterCode = semester.toString().substring(4, 5)
  const semesterName = courseShortSemester[semesterCode] || ''
  return `${semesterName} ${year}`
}

const LinkToValidSyllabusPdf: React.FC<{
  semester: string
}> = ({ semester }) => {
  const [{ courseKoppsData, userLang }] = useWebContext()
  const { courseCode, syllabusPeriods } = courseKoppsData

  const syllabusPeriodStart = getSyllabusPeriodStart(syllabusPeriods, semester)

  const { syllabusLink, courseShortSemester } = i18n.messages[userLang === 'en' ? 0 : 1]?.analysisHeaders
  const { header } = syllabusLink

  if (!syllabusPeriods[syllabusPeriodStart]) {
    console.log(
      'Couldn’t find syllabusPeriod with key startDate for syllabusPeriods',
      syllabusPeriodStart,
      syllabusPeriods
    )
  }

  const syllabusPeriod = syllabusPeriods[syllabusPeriodStart]
  const startTermName = formatSemesterName(syllabusPeriodStart, courseShortSemester)
  const endTermName = formatSemesterName(syllabusPeriod?.endDate || '', courseShortSemester)
  const syllabusLabel = `${header} ${courseCode} ( ${startTermName} - ${endTermName} )`

  return (
    <ActiveOrDisabledLink
      href={`${SYLLABUS_URL}${courseCode}-${syllabusPeriodStart}.pdf?lang=${userLang}`}
      linkTitle={syllabusLabel}
      className="pdf-link"
    />
  )
}

export default LinkToValidSyllabusPdf
