import React from 'react'
import SyllabusListInCollapse from './SyllabusListInCollapse'
import { COURSE_INFO_URL } from '../util/constants'

const CollapseSyllabusHistory = ({ courseCode, translate, lang }) => {
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
      <aside className="col">
        <SyllabusListInCollapse translate={translate} lang={lang} />
      </aside>
    </div>
  )
}

export default CollapseSyllabusHistory
