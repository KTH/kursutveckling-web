import TableForCourseRound from './TableForCourseRound'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'


const CourseDevAllRoundsForEachYear = ({arrOfRoundObj, koppsData, courseCode, year, translate}) => {
  const linkToCreateNew = `${KUTV_ADMIN_URL}${courseCode}?l=${koppsData.lang}&status=n&serv=kutv`
  return (
    <span>
      <span className='navigation'>
        <h3>{year}</h3>
        <a href={linkToCreateNew}>{translate.header_main_publish_new}</a>
      </span>
      {arrOfRoundObj.length === 0
      ? <p>{translate.no_course_analys}</p>
      : arrOfRoundObj.map((roundObj, index) =>
        <span className='table-for-year' key={index}>
          <p className='right-link'>
            <a href={`${KUTV_ADMIN_URL}${roundObj._id}?l=${koppsData.lang}&serv=kutv&status=p&title=${koppsData.course_title}_${koppsData.course_credits}`}>
              {translate.header_main_edit}
            </a>
          </p>
          <TableForCourseRound courseRoundObj={roundObj} courseAnalysDataId={roundObj._id} translate={translate} />
        </span>
      )
    }
    </span>
      )
}

const CourseDevAllYears = ({allYearsObj, koppsData, courseCode, translate}) => {
  const yearsDescending = Object.keys(allYearsObj).reverse()
  return (
    <div className='tables-list col'>
      {
        yearsDescending.map((year, index) =>
          <CourseDevAllRoundsForEachYear key={index}
            arrOfRoundObj={allYearsObj[year]}
            koppsData={koppsData} courseCode={courseCode}
            year={year}
            translate={translate} />
        )
      }
    </div>
  )
}

export default CourseDevAllYears
