import TableForCourseRound from './TableForCourseRound'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'

const CourseDevAllRoundsForEachYear = ({oneYearAnalysisDataArrOfObj, koppsData, year, translate}) => {
  const koppsDataLang = koppsData.lang
  const courseTitle = koppsData.courseTitle
  const courseCredits = koppsData.courseCredits
  const linkToCreateNew = `${KUTV_ADMIN_URL}${koppsData.courseCode}?l=${koppsDataLang}&status=n&serv=kutv`
  return (
    <span>
      <span className='header-with-link'>
        <h3>{year}</h3>
        <a href={linkToCreateNew}>{translate.header_main_publish_new}</a>
      </span>
      {oneYearAnalysisDataArrOfObj.length === 0
      ? <p>{translate.no_course_analys}</p>
      : oneYearAnalysisDataArrOfObj.map((eachRoundObj, index) =>
        <span className='table-for-year' key={index}>
          <p className='right-link'>
            <a href={`${KUTV_ADMIN_URL}${eachRoundObj._id}?l=${koppsDataLang}&serv=kutv&status=p&title=${courseTitle}_${courseCredits}`}>
              {translate.header_main_edit}
            </a>
          </p>
          <TableForCourseRound courseRoundObj={eachRoundObj} courseAnalysDataId={eachRoundObj._id} translate={translate} />
        </span>
      )
    }
    </span>
      )
}

const CourseDevAllYears = ({allYearsAnalysisDataObj, koppsData, translate}) => {
  const yearsDescending = Object.keys(allYearsAnalysisDataObj).reverse()
  return (
    <div className='tables-list col'>
      {
        yearsDescending.map((year, index) =>
          <CourseDevAllRoundsForEachYear key={index}
            oneYearAnalysisDataArrOfObj={allYearsAnalysisDataObj[year]}
            koppsData={koppsData}
            year={year}
            translate={translate} />
        )
      }
    </div>
  )
}

export default CourseDevAllYears
