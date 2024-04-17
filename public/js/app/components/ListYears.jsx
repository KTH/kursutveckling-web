import React from 'react'
import Details from './Details'
import DocumentLinksNav from './DocumentLinksNav'
import TableWithCourseData from './TableWithCourseData'

const SectionPerYear = ({ thisYearAnalyses, koppsData, year, tableLabels, userLang }) => {
  const { koppsDataLang } = koppsData
  const headerId = 'header-year' + year
  // Sort analyses, so fall semester courses come before spring semester courses
  thisYearAnalyses.sort((firstEl, secondEl) =>
    secondEl.semester > firstEl.semester ? 1 : firstEl.semester > secondEl.semester ? -1 : 0
  )
  return thisYearAnalyses.length === 0 ? (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>{year}</h2>
      <p>
        <i>{tableLabels.no_course_analys}</i>
      </p>
    </section>
  ) : (
    thisYearAnalyses.map((thisOfferingAnalysis, index) => {
      const { analysisName, _id: courseAnalysDataId } = thisOfferingAnalysis
      return (
        <section
          className="course-data-for-round"
          aria-describedby={'h3' + courseAnalysDataId}
          key={'section-for-analys-' + courseAnalysDataId}
        >
          {index === 0 && <h2 id={headerId}>{year}</h2>}
          <h3 id={'h3' + courseAnalysDataId}>{analysisName}</h3>
          <DocumentLinksNav lang={koppsDataLang} translate={tableLabels} staticAnalysisInfo={thisOfferingAnalysis} />

          <TableWithCourseData
            thisAnalysisObj={thisOfferingAnalysis}
            translate={tableLabels.table_headers_with_popup}
          />
          <div className="float-right inline-flex" lang={userLang}>
            <p className="icon-asterisk-black" />
            <p>{tableLabels.info_manually_edited}</p>
          </div>
          <Details thisAnalysisObj={thisOfferingAnalysis} translate={tableLabels} />
        </section>
      )
    })
  )
}

const ListYears = ({ allYearsAnalysisDataObj, koppsData, pageTitles, tableHeaders, userLang }) => {
  const yearsDescending = Object.keys(allYearsAnalysisDataObj).reverse()
  return (
    <div className="list-section-per-year">
      {yearsDescending.map((year, index) => (
        <SectionPerYear
          key={index}
          thisYearAnalyses={allYearsAnalysisDataObj[year]}
          koppsData={koppsData}
          year={year}
          pageLabels={pageTitles}
          tableLabels={tableHeaders}
          userLang={userLang}
        />
      ))}
    </div>
  )
}

export default ListYears
