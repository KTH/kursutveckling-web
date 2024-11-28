import React from 'react'
import Details from './Details'
import DocumentLinksNav from './DocumentLinksNav'
import TableWithCourseData from './TableWithCourseData'
import AnalysisListItem from './AnalysisListItem'

const AnalysesFromCanvas = ({ thisYearAnalyses, koppsData }) => {
  return thisYearAnalyses?.map((thisOfferingAnalysis) => {
    const { id } = thisOfferingAnalysis
    return <AnalysisListItem key={id} analysis={thisOfferingAnalysis} koppsData={koppsData} />
  })
}

const AnalysesFromAdminWeb = ({ thisYearAnalyses, koppsData, tableLabels, userLang }) => {
  const { koppsDataLang } = koppsData
  return thisYearAnalyses?.map((thisOfferingAnalysis) => {
    const { analysisName, _id: courseAnalysDataId } = thisOfferingAnalysis
    return (
      <section
        className="course-data-for-round"
        aria-describedby={'h3' + courseAnalysDataId}
        key={'section-for-analys-' + courseAnalysDataId}
      >
        <h3 id={'h3' + courseAnalysDataId}>{analysisName}</h3>
        <DocumentLinksNav lang={koppsDataLang} translate={tableLabels} staticAnalysisInfo={thisOfferingAnalysis} />

        <TableWithCourseData thisAnalysisObj={thisOfferingAnalysis} translate={tableLabels} />
        <div className="float-right inline-flex" lang={userLang}>
          <p className="icon-asterisk-black" />
          <p>{tableLabels.info_manually_edited}</p>
        </div>
        <Details thisAnalysisObj={thisOfferingAnalysis} translate={tableLabels} />
      </section>
    )
  })
}

const sortBySemester = (analyses) => {
  return analyses?.sort((a, b) => (b.semester > a.semester ? 1 : a.semester > b.semester ? -1 : 0))
}

const SectionPerYear = ({
  thisYearAnalysesCanvas,
  thisYearAnalysesAdminWeb,
  koppsData,
  year,
  tableLabels,
  userLang
}) => {
  const headerId = 'header-year' + year
  // Sort analyses, so fall semester courses come before spring semester courses
  const sortedAnalysesCanvas = sortBySemester(thisYearAnalysesCanvas)
  const sortedAnalysesAdminWeb = sortBySemester(thisYearAnalysesAdminWeb)

  const yearHasNoAnalyses = sortedAnalysesAdminWeb?.length === 0 && sortedAnalysesCanvas?.length === 0

  return yearHasNoAnalyses ? (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>{year}</h2>
      <p>
        <i>{tableLabels.no_course_analysis}</i>
      </p>
    </section>
  ) : (
    <>
      <h2 id={headerId}>{year}</h2>
      <AnalysesFromCanvas thisYearAnalyses={thisYearAnalysesCanvas} koppsData={koppsData} />
      <AnalysesFromAdminWeb
        thisYearAnalyses={thisYearAnalysesAdminWeb}
        koppsData={koppsData}
        tableLabels={tableLabels}
        userLang={userLang}
      />
    </>
  )
}

const ListYears = ({
  allYearsAnalysisDataObjCanvas,
  allYearsAnalysisDataObjAdminWeb,
  koppsData,
  pageTitles,
  tableHeaders,
  userLang
}) => {
  const yearsCanvas = Object.keys(allYearsAnalysisDataObjCanvas ?? {})
  const yearsAdminWeb = Object.keys(allYearsAnalysisDataObjAdminWeb ?? {})
  const allYearsDescending = Array.from(new Set([...yearsAdminWeb, ...yearsCanvas]))
    .sort((a, b) => a - b)
    .reverse()
  return (
    <div className="list-section-per-year">
      {allYearsDescending.map((year) => (
        <SectionPerYear
          key={year}
          thisYearAnalysesCanvas={allYearsAnalysisDataObjCanvas[year]}
          thisYearAnalysesAdminWeb={allYearsAnalysisDataObjAdminWeb[year]}
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
