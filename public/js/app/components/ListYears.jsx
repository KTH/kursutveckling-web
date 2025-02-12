import React from 'react'
import AnalysisList from './AnalysisList'
import i18n from '../../../../i18n'
import { useWebContext } from '../context/WebContext'

const fillAndSortYears = (years) => {
  const currentYear = new Date().getFullYear()
  if (years.length === 0) return [currentYear]

  // If there's data from two years ago or last year, extend the list to the current year
  if ((years.includes(currentYear - 1) || years.includes(currentYear - 2)) && !years.includes(currentYear)) {
    years.push(currentYear)
  }

  // Generate all years from minYear to maxYear
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const allYears = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index)

  return allYears.sort((a, b) => b - a)
}

const sortBySemester = (analyses) => {
  return analyses?.sort((a, b) => b.semester - a.semester)
}

const SectionPerYear = ({ year, thisYearAnalysesCanvas, thisYearAnalysesAdminWeb, noCourseAnalysisText }) => {
  const headerId = `header-year-${year}`
  const sortedAnalysesCanvas = sortBySemester(thisYearAnalysesCanvas)
  const sortedAnalysesAdminWeb = sortBySemester(thisYearAnalysesAdminWeb)

  const hasNoAnalyses = !sortedAnalysesAdminWeb?.length && !sortedAnalysesCanvas?.length

  return (
    <section aria-describedby={headerId}>
      <h2 className="year-header" id={headerId}>
        {year}
      </h2>
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
  const yearsWithData = [
    ...new Set([
      ...Object.keys(allYearsAnalysisDataObjCanvas ?? {}),
      ...Object.keys(allYearsAnalysisDataObjAdminWeb ?? {})
    ])
  ].map(Number)

  const allYearsDescending = fillAndSortYears(yearsWithData)
  const [{ userLang }] = useWebContext()
  const { no_course_analysis } = i18n.messages[userLang === 'en' ? 0 : 1].analysisHeaders

  return (
    <div className="list-section-per-year">
      {allYearsDescending.map((year) => (
        <SectionPerYear
          key={year}
          year={year}
          thisYearAnalysesCanvas={allYearsAnalysisDataObjCanvas?.[year]}
          thisYearAnalysesAdminWeb={allYearsAnalysisDataObjAdminWeb?.[year]}
          noCourseAnalysisText={no_course_analysis}
        />
      ))}
    </div>
  )
}

export default ListYears
