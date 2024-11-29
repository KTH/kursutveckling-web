import React from 'react'
import AnalysisList from './AnalysisList'
import i18n from '../../../../i18n'
import { useWebContext } from '../context/WebContext'

const sortBySemester = (analyses) => {
  return analyses?.sort((a, b) => (b.semester > a.semester ? 1 : a.semester > b.semester ? -1 : 0))
}

const SectionPerYear = ({ year, thisYearAnalysesCanvas, thisYearAnalysesAdminWeb, noCourseAnalysisText }) => {
  const headerId = `header-year-${year}`
  // Sort analyses, so fall semester courses come before spring semester courses
  const sortedAnalysesCanvas = sortBySemester(thisYearAnalysesCanvas)
  const sortedAnalysesAdminWeb = sortBySemester(thisYearAnalysesAdminWeb)

  const hasNoAnalyses = sortedAnalysesAdminWeb?.length === 0 && sortedAnalysesCanvas?.length === 0

  console.log('sortedAnalysesCanvas', sortedAnalysesCanvas)
  console.log('sortedAnalysesAdminWeb', sortedAnalysesAdminWeb)
  return (
    <section aria-describedby={headerId}>
      <h2 id={headerId}>{year}</h2>
      {hasNoAnalyses ? (
        <p>
          <i>{noCourseAnalysisText}</i>
        </p>
      ) : (
        <>
          <AnalysisList analyses={sortedAnalysesCanvas} />
          <AnalysisList analyses={sortedAnalysesAdminWeb} />
        </>
      )}
    </section>
  )
}

const ListYears = ({ allYearsAnalysisDataObjCanvas, allYearsAnalysisDataObjAdminWeb }) => {
  const yearsCanvas = Object.keys(allYearsAnalysisDataObjCanvas ?? {})
  const yearsAdminWeb = Object.keys(allYearsAnalysisDataObjAdminWeb ?? {})
  const allYearsDescending = Array.from(new Set([...yearsAdminWeb, ...yearsCanvas]))
    .sort((a, b) => a - b)
    .reverse()

  const [{ userLang }] = useWebContext()
  const { noCourseAnalysis } = i18n.messages[userLang === 'en' ? 0 : 1].tableHeaders

  return (
    <div className="list-section-per-year">
      {allYearsDescending.map((year) => (
        <SectionPerYear
          key={year}
          year={year}
          thisYearAnalysesCanvas={allYearsAnalysisDataObjCanvas[year]}
          thisYearAnalysesAdminWeb={allYearsAnalysisDataObjAdminWeb[year]}
          noCourseAnalysisText={noCourseAnalysis}
        />
      ))}
    </div>
  )
}

export default ListYears
