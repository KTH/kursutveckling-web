import React from 'react'
import { KUTV_ADMIN_URL } from '../util/constants'
import Details from './Details'
import PdfLinksNav from './PdfLinksNav'
import TableWithCourseData from './TableWithCourseData'


const SectionPerYear = ({ thisYearAnalyses, koppsData, year, pageLabels, tableLabels }) => {
  const { courseCode, courseTitle, courseCredits, koppsDataLang } = koppsData
  const linkToCreateNew = `${KUTV_ADMIN_URL}${courseCode}?l=${koppsDataLang}&status=n&serv=kutv`
  const headerId = 'header-year' + year
  // Sort analyses, so fall semester courses come before spring semester courses
  thisYearAnalyses.sort((firstEl, secondEl) =>
    secondEl.semester > firstEl.semester ? 1 : firstEl.semester > secondEl.semester ? -1 : 0
  )
  return (
    thisYearAnalyses.length === 0 ? (
      <section aria-describedby={headerId}>
        <h2 id={headerId}>{year}</h2>
        <p><i>{tableLabels.no_course_analys}</i></p>
      </section>
    ) : (
      thisYearAnalyses.map((thisOfferingAnalysis, index) => {
        const { analysisName, _id: courseAnalysDataId } = thisOfferingAnalysis
        return (
          <section
            className="course-data-for-round"
            aria-describedby={'h3' + courseAnalysDataId}
          >
            {index === 0 && <h2 id={headerId}>{year}</h2>}
            <h3 className="mb-0" id={'h3' + courseAnalysDataId}>
                {analysisName}
            </h3>
            <PdfLinksNav
              lang={koppsDataLang}
              translate={tableLabels}
              thisAnalysisObj={thisOfferingAnalysis}
            />

            <TableWithCourseData
              thisAnalysisObj={thisOfferingAnalysis}
              translate={tableLabels.table_headers_with_popup}
            />

            <Details
              label={'moreData' + courseAnalysDataId}
              thisAnalysisObj={thisOfferingAnalysis}
              translate={tableLabels}
            />
          </section>
          // <article className="table-for-year" key={index}>
          //   <div>
          //     <a
          //       className="right-link"
          //       href={`${KUTV_ADMIN_URL}${courseAnalysDataId}?l=${koppsDataLang}&serv=kutv&status=p&title=${courseTitle}_${courseCredits}`}
          //       aria-label={`${tableLabels.aria_label_header_main_edit} ${analysisName}`}
          //     >
          //       {tableLabels.header_main_edit}
          //     </a>
          //   </div>
          //   <SectionForEachCourseOffering
          //     thisAnalysisObj={thisOfferingAnalysis}
          //     tableLabels={tableLabels}
          //   />
          // </article>
        )
      })
    )
  )
}

const ListYears = ({ allYearsAnalysisDataObj, koppsData, pageTitles, tableHeaders }) => {
  const yearsDescending = Object.keys(allYearsAnalysisDataObj).reverse()
  return (
    <section className="list-section-per-year col">
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
