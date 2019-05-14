import TableForCourseRound from './TableForCourseRound'
import React from 'react'

const CourseDevPerRound = ({arrOfRoundsObj, year}) => {
  return (
    <span>
      <h3>{year}</h3>
      {
      arrOfRoundsObj.length === 0
      ? <p>Kursutveckling saknas</p>
      : arrOfRoundsObj.map(roundObj =>
        <TableForCourseRound courseRound={roundObj.analysisName} togglerId='toggler1' />
      )
    }
    </span>
      )
}

const CourseDevAllYears = ({allYearsObj}) => {
  const yearsDescending = Object.keys(allYearsObj).reverse()
  return (
    <div className='tables-list col'>
      {
        yearsDescending.map(year => <CourseDevPerRound arrOfRoundsObj={allYearsObj[year]} year={year} />)
      }
    </div>
  )
}

export default CourseDevAllYears
