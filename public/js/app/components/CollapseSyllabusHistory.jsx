import React from 'react'
import LinkToValidSyllabusPdf from '../components/LinkToValidSyllabus'

const CollapseSyllabusHistory = ({ courseCode, translate, lang, sortedSyllabusStart }) => 
  <details className="col course-syllabuses"
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


export default CollapseSyllabusHistory
