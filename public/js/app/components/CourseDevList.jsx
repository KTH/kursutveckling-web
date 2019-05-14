import TableForCourseRound from './TableForCourseRound'
import React from 'react'

const CourseDevAllRounds = ({arrOfRoundObj, year}) => {
  return (
    <span>
      <h3>{year}</h3>
      {
      arrOfRoundObj.length === 0
      ? <p>Kursutveckling saknas</p>
      : arrOfRoundObj.map(roundObj =>
        <TableForCourseRound courseRoundObj={roundObj} togglerId={roundObj._id} />
      )
    }
    </span>
      )
}

const CourseDevAllYears = ({allYearsObj}) => {
  console.log('arrOfRoundObj', allYearsObj)
  const yearsDescending = Object.keys(allYearsObj).reverse()
  return (
    <div className='tables-list col'>
      {
        yearsDescending.map(year => <CourseDevAllRounds arrOfRoundObj={allYearsObj[year]} year={year} />)
      }
    </div>
  )
}

export default CourseDevAllYears
