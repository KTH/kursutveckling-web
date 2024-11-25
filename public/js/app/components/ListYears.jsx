import React from 'react'
import Details from './Details'
import DocumentLinksNav from './DocumentLinksNav'
import TableWithCourseData from './TableWithCourseData'
import Analysis from './Analysis'

function getSyllabusPeriodStart(semesters, targetSemester) {
  for (const [key, value] of Object.entries(semesters)) {
    const keyAsNumber = parseInt(key, 10) // Convert the key to a number
    const endDate = value.endDate === '' ? Infinity : Number(value.endDate)

    if (targetSemester >= keyAsNumber && targetSemester <= endDate) {
      return key // Return the key if targetSemester is between key and endDate
    }
  }
  return null // Return null if no match is found
}

const AnalysesFromCanvas = ({ thisYearAnalyses, koppsData, tableLabels, userLang }) => {
  const { koppsDataLang, syllabusPeriods } = koppsData
  return thisYearAnalyses?.map((thisOfferingAnalysis) => {
    const {
      id,
      analysisName,
      alterationText,
      responsibles,
      examiners,
      registeredStudents,
      programmeCodes,
      totalReportedResults,
      gradingDistribution,
      semester
    } = thisOfferingAnalysis
    const syllabusPeriodStart = getSyllabusPeriodStart(syllabusPeriods, semester)
    return (
      <Analysis
        key={id}
        analysisName={analysisName}
        alterationText={alterationText}
        responsibles={responsibles}
        examiners={examiners}
        registeredStudents={registeredStudents}
        gradingDistribution={gradingDistribution}
        totalReportedResults={totalReportedResults}
        programmeCodes={programmeCodes}
        syllabusPeriodStart={syllabusPeriodStart}
        userLang={koppsDataLang}
      />
    )
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

        <TableWithCourseData thisAnalysisObj={thisOfferingAnalysis} translate={tableLabels.table_headers_with_popup} />
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
  thisYearAnalysesAdminWeb,
  thisYearAnalysesCanvas,
  koppsData,
  year,
  tableLabels,
  userLang
}) => {
  const headerId = 'header-year' + year
  // Sort analyses, so fall semester courses come before spring semester courses
  const sortedAnalysesAdminWeb = sortBySemester(thisYearAnalysesAdminWeb)
  const sortedAnalysesCanvas = sortBySemester(thisYearAnalysesCanvas)

  return sortedAnalysesAdminWeb?.length === 0 && sortedAnalysesCanvas?.length === 0 ? (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>{year}</h2>
      <p>
        <i>{tableLabels.no_course_analysis}</i>
      </p>
    </section>
  ) : (
    <>
      <h2 id={headerId}>{year}</h2>
      <AnalysesFromCanvas
        thisYearAnalyses={thisYearAnalysesCanvas}
        koppsData={koppsData}
        tableLabels={tableLabels}
        userLang={userLang}
      />
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
  allYearsAnalysisDataObjAdminWeb,
  allYearsAnalysisDataObjCanvas,
  koppsData,
  pageTitles,
  tableHeaders,
  userLang
}) => {
  const yearsAdminWeb = Object.keys(allYearsAnalysisDataObjAdminWeb ?? {})
  const yearsCanvas = Object.keys(allYearsAnalysisDataObjCanvas ?? {})
  const yearsDescending = Array.from(new Set([...yearsAdminWeb, ...yearsCanvas]))
    .sort((a, b) => a - b)
    .reverse()
  return (
    <div className="list-section-per-year">
      {yearsDescending.map((year, index) => (
        <SectionPerYear
          key={index}
          thisYearAnalysesAdminWeb={allYearsAnalysisDataObjAdminWeb[year]}
          thisYearAnalysesCanvas={allYearsAnalysisDataObjCanvas[year]}
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
