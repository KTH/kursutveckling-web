import TableForCourseRound from './TableForCourseRound'
import React from 'react'

const CourseDevAllRounds = ({arrOfRoundObj, year, translate}) => {
  return (
    <span>
      <h3>{year}</h3>
      {
      arrOfRoundObj.length === 0
      ? <p>{translate.no_course_analys}</p>
      : arrOfRoundObj.map(roundObj =>
        <TableForCourseRound courseRoundObj={roundObj} togglerId={roundObj._id} translate={translate} />
      )
    }
    </span>
      )
}

const CourseDevAllYears = ({allYearsObj, translate}) => {
  console.log('arrOfRoundObj', allYearsObj)
  const yearsDescending = Object.keys(allYearsObj).reverse()
  return (
    <div className='tables-list col'>
      {
        yearsDescending.map(year =>
          <CourseDevAllRounds arrOfRoundObj={allYearsObj[year]} year={year} translate={translate} />
        )
      }
    </div>
  )
}

export default CourseDevAllYears
