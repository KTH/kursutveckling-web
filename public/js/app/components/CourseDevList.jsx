import TableForCourseRound from './TableForCourseRound'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'

const CourseDevAllRoundsForEachYear = ({arrOfRoundObj, lang, courseCode, year, translate}) => {
  return (
    <span>
      <span className='navigation'>
        <h3>{year}</h3>
        <a href={`${KUTV_ADMIN_URL}${courseCode}?l=${lang}`}>{translate.header_main_publish_new}</a>
      </span>
      {arrOfRoundObj.length === 0
      ? <p>{translate.no_course_analys}</p>
      : arrOfRoundObj.map((roundObj, index) =>
        <span className='table-for-year' key={index}>
          <p className='right-link'><a href={`${KUTV_ADMIN_URL}${roundObj._id}?l=${lang}`}>{translate.header_main_edit}</a></p>
          <TableForCourseRound courseRoundObj={roundObj} courseAnalysDataId={roundObj._id} translate={translate} />
        </span>
      )
    }
    </span>
      )
}

const CourseDevAllYears = ({allYearsObj, lang, courseCode, translate}) => {
  console.log('arrOfRoundObj', allYearsObj)
  const yearsDescending = Object.keys(allYearsObj).reverse()
  return (
    <div className='tables-list col'>
      {
        yearsDescending.map((year, index) =>
          <CourseDevAllRoundsForEachYear key={index} arrOfRoundObj={allYearsObj[year]} lang={lang} courseCode={courseCode} year={year} translate={translate} />
        )
      }
    </div>
  )
}

export default CourseDevAllYears
