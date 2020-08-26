import SectionForEachCourseOffering from './SectionForEachCourseOffering'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'

const SectionPerYear = ({ thisYearAnalyses, koppsData, year, translate }) => {
  const { courseCode, courseTitle, courseCredits, koppsDataLang } = koppsData
  const linkToCreateNew = `${KUTV_ADMIN_URL}${courseCode}?l=${koppsDataLang}&status=n&serv=kutv`

  // Sort analyses, so fall semester courses come before spring semester courses
  thisYearAnalyses.sort((firstEl, secondEl) =>
    secondEl.semester > firstEl.semester ? 1 : firstEl.semester > secondEl.semester ? -1 : 0
  )

  return (
    <span>
      <span className="header-with-link">
        <h2>{year}</h2>
        <a
          href={linkToCreateNew}
          className="right-link"
          aria-label={`${translate.alt_header_main_publish_new} ${year}`}
        >
          {translate.header_main_publish_new}
        </a>
      </span>
      {thisYearAnalyses.length === 0 ? (
        <p>{translate.no_course_analys}</p>
      ) : (
        thisYearAnalyses.map((thisOfferingAnalysis, index) => (
          <span className="table-for-year" key={index}>
            <p className="right-link">
              <a
                href={`${KUTV_ADMIN_URL}${
                  thisOfferingAnalysis._id
                }?l=${koppsDataLang}&serv=kutv&status=p&title=${courseTitle}_${courseCredits}`}
                aria-label={`${translate.alt_header_main_edit} ${
                  thisOfferingAnalysis.analysisName
                }`}
              >
                {translate.header_main_edit}
              </a>
            </p>
            <SectionForEachCourseOffering
              thisAnalysisObj={thisOfferingAnalysis}
              translate={translate}
            />
          </span>
        ))
      )}
    </span>
  )
}

const ListYears = ({ allYearsAnalysisDataObj, koppsData, translate }) => {
  const yearsDescending = Object.keys(allYearsAnalysisDataObj).reverse()
  return (
    <div className="tables-list col">
      <p>{translate.info_manually_edited}</p>
      {yearsDescending.map((year, index) => (
        <SectionPerYear
          key={index}
          thisYearAnalyses={allYearsAnalysisDataObj[year]}
          koppsData={koppsData}
          year={year}
          translate={translate}
        />
      ))}
    </div>
  )
}

export default ListYears
