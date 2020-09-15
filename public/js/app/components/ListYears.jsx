import SectionForEachCourseOffering from './SectionForEachCourseOffering'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'

const SectionPerYear = ({ thisYearAnalyses, koppsData, year, pageLabels, tableLabels }) => {
  const { courseCode, courseTitle, courseCredits, koppsDataLang } = koppsData
  const linkToCreateNew = `${KUTV_ADMIN_URL}${courseCode}?l=${koppsDataLang}&status=n&serv=kutv`
  const headerId = 'year-header-' + year
  const thisSectionId = 'section-for-year-' + year
  // Sort analyses, so fall semester courses come before spring semester courses
  thisYearAnalyses.sort((firstEl, secondEl) =>
    secondEl.semester > firstEl.semester ? 1 : firstEl.semester > secondEl.semester ? -1 : 0
  )

  return (
    <section id={thisSectionId}>
        <h2 id={headerId}>{year}</h2>
      {thisYearAnalyses.length === 0 ? (
        <p>{tableLabels.no_course_analys}</p>
      ) : (
        thisYearAnalyses.map((thisOfferingAnalysis, index) => {
          const { analysisName, _id: courseAnalysDataId } = thisOfferingAnalysis
          return (
            <article className="table-for-year" key={index}>
              <span className="right-link">
                <a
                  href={`${KUTV_ADMIN_URL}${courseAnalysDataId}?l=${koppsDataLang}&serv=kutv&status=p&title=${courseTitle}_${courseCredits}`}
                  aria-label={`${tableLabels.aria_label_header_main_edit} ${analysisName}`}
                >
                  {tableLabels.header_main_edit}
                </a>
              </span>
              <SectionForEachCourseOffering
                parentSectionId={thisSectionId}
                thisAnalysisObj={thisOfferingAnalysis}
                tableLabels={tableLabels}
              />
            </article>
          )
        })
      )}
    </section>
  )
}

const ListYears = ({ allYearsAnalysisDataObj, koppsData, pageTitles, tableHeaders }) => {
  const yearsDescending = Object.keys(allYearsAnalysisDataObj).reverse()
  return (
    <section className="tables-list col">
      <p>{tableHeaders.info_manually_edited}</p>
      {yearsDescending.map((year, index) => (
        <SectionPerYear
          key={index}
          thisYearAnalyses={allYearsAnalysisDataObj[year]}
          koppsData={koppsData}
          year={year}
          pageLabels={pageTitles}
          tableLabels={tableHeaders}
        />
      ))}
    </section>
  )
}

export default ListYears
