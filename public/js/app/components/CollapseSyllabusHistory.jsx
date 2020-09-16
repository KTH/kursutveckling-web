import React from 'react'
import { COURSE_INFO_URL } from '../util/constants'
import LinkToValidSyllabusPdf from '../components/LinkToValidSyllabus'

const CollapseSyllabusHistory = ({ courseCode, translate, lang, sortedSyllabusStart }) => {
  const kursOmLink = `${COURSE_INFO_URL}${courseCode}?l=${lang}`
  const { about_course } = translate
  const labelAboutCoursePage = `${about_course} ${courseCode}`

  return (
    <div className="history row">
      <nav className="col">
        <a href={kursOmLink} className="link-back">
          {labelAboutCoursePage}
        </a>
      </nav>
      <details className="col-4 course-syllabuses"
        aria-labelledby="syllabuses-list">
        <summary className="blue" id="syllabuses-list">{translate.header_syllabuses}</summary>
        <div className="collapse-bordered-list">
            {/* --- ALL SYLLABUS LINKS--- */}
            {sortedSyllabusStart.length > 0
              ? sortedSyllabusStart.map((tillSemester, index, semesterArr) => {
                  if (semesterArr[index + 1]) {
                    const startDate = semesterArr[index + 1].toString()
                    return (
                      <LinkToValidSyllabusPdf startDate={startDate} lang={lang} key={startDate} />
                    )
                  }
                })
              : translate.no_course_syllabus}
          </div>
      </details>
    </div>
  )
}

export default CollapseSyllabusHistory
