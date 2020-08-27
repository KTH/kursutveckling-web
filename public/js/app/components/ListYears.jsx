import SectionForEachCourseOffering from './SectionForEachCourseOffering'
import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'

const SectionPerYear = ({ thisYearAnalyses, koppsData, year, pageLabels, tableLabels }) => {
  const { courseCode, courseTitle, courseCredits, koppsDataLang } = koppsData
  const linkToCreateNew = `${KUTV_ADMIN_URL}${courseCode}?l=${koppsDataLang}&status=n&serv=kutv`
  const headerId = 'header' + year
  // Sort analyses, so fall semester courses come before spring semester courses
  thisYearAnalyses.sort((firstEl, secondEl) =>
    secondEl.semester > firstEl.semester ? 1 : firstEl.semester > secondEl.semester ? -1 : 0
  )

  return (
    <article
      aria-label={`${tableLabels.aria_label_header_main_publish_new} ${year}`}
      aria-labelledby={headerId}
      aria-describedby="section-with-years"
    >
      <header
        className="header-with-link"
        role={pageLabels.aria_header_and_link}
        aria-labelledby={headerId}
      >
        <h2 id={headerId} aria-label={pageLabels.aria_year}>
          {year}
        </h2>
        <nav>
          <a
            href={linkToCreateNew}
            className="right-link"
            aria-label={`${tableLabels.aria_label_header_main_publish_new} ${year}`}
          >
            {tableLabels.header_main_publish_new}
          </a>
        </nav>
      </header>
      {thisYearAnalyses.length === 0 ? (
        <p>{tableLabels.no_course_analys}</p>
      ) : (
        thisYearAnalyses.map((thisOfferingAnalysis, index) => (
          <article className="table-for-year" key={index}>
            <nav className="right-link">
              <a
                href={`${KUTV_ADMIN_URL}${
                  thisOfferingAnalysis._id
                }?l=${koppsDataLang}&serv=kutv&status=p&title=${courseTitle}_${courseCredits}`}
                aria-label={`${tableLabels.aria_label_header_main_edit} ${
                  thisOfferingAnalysis.analysisName
                }`}
              >
                {tableLabels.header_main_edit}
              </a>
            </nav>
            <SectionForEachCourseOffering
              thisAnalysisObj={thisOfferingAnalysis}
              tableLabels={tableLabels}
            />
          </article>
        ))
      )}
    </article>
  )
}

const ListYears = ({ allYearsAnalysisDataObj, koppsData, pageTitles, tableHeaders }) => {
  const yearsDescending = Object.keys(allYearsAnalysisDataObj).reverse()
  return (
    <section
      className="tables-list col"
      role="list"
      id="section-with-years"
      aria-label={pageTitles.aria_label_list_years}
      aria-labelledby="course-title"
    >
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
