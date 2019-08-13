import '@babel/polyfill'
import CourseDevelopmentForEachCourseRound from './CourseDevelopmentForEachCourseRound'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'

const CourseDevAllRoundsForEachYear = ({oneYearAnalysisDataArrOfObj, koppsData, year, translate}) => {
  const { courseCode, courseTitle, courseCredits, koppsDataLang } = koppsData
  const linkToCreateNew = `${KUTV_ADMIN_URL}${courseCode}?l=${koppsDataLang}&status=n&serv=kutv`
  return (
    <span>
      <span className='header-with-link'>
        <h2>{year}</h2>
        <a href={linkToCreateNew} className='right-link' alt={translate.alt_header_main_publish_new}>{translate.header_main_publish_new}</a>
      </span>
      {oneYearAnalysisDataArrOfObj.length === 0
      ? <p>{translate.no_course_analys}</p>
      : oneYearAnalysisDataArrOfObj.map((eachRoundObj, index) =>
        <span className='table-for-year' key={index}>
          <p className='right-link'>
            <a href={`${KUTV_ADMIN_URL}${eachRoundObj._id}?l=${koppsDataLang}&serv=kutv&status=p&title=${courseTitle}_${courseCredits}`}
              alt={translate.alt_header_main_edit}>
              {translate.header_main_edit}
            </a>
          </p>
          <CourseDevelopmentForEachCourseRound courseRoundObj={eachRoundObj} translate={translate} />
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
      <p>{translate.info_manually_edited}</p>
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
