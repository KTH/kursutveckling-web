import React from 'react'
import { Button, Table } from 'reactstrap'
import ControlledPopover from './PopOverTextForTable'

function _getListOfExamRounds(rawExamRoundsStrArr) {
  let listOfShortStrForExamRounds = []
  if (rawExamRoundsStrArr && rawExamRoundsStrArr.length > 0) {
    listOfShortStrForExamRounds = rawExamRoundsStrArr.map(row => {
      const examInfoArr = row.trim().split(';')
      return `${examInfoArr[0]} (${examInfoArr[2]}) ${examInfoArr[5]}` || ''
    })
  }
  return listOfShortStrForExamRounds
}

const TableWithCourseData = ({ translate, thisAnalysisObj }) => {
  const { examinationRounds: rawExamsData, _id: popOverId } = thisAnalysisObj
  const listOfExamRounds = _getListOfExamRounds(rawExamsData)
  const orderedColumns = [
    'responsibles',
    'examiners',
    'registeredStudents',
    'examRounds',
    'examinationGrade',
    'alterationText'
  ]
  return (
    <span className="table-for-each-course-offering" key={popOverId}>
      <Table>
        <thead>
          <tr>
            {orderedColumns.map((colName, index) => {
              const popOverTargetId = 'targetforDesktopPopOver' + popOverId + colName
              const ariaDescribedBy = 'header-description' + popOverId + colName
              const { header, popoverText } = translate[colName]
              return (
                <th key={index} className={colName} aria-describedby={ariaDescribedBy}>
                  {header}{' '}
                  <ControlledPopover
                    targetId={popOverTargetId}
                    describesId={ariaDescribedBy}
                    header={header}
                    popoverText={popoverText}
                    popType="desktop"
                  />{' '}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {orderedColumns.map((colName, index) => {
              const popOverTargetId = 'targetforMobilePopOver' + popOverId + colName
              const ariaDescribedBy = 'mobile-header-description' + popOverId + colName
              const { header, popoverText } = translate[colName]
              return (
                <td className={colName} id={colName + popOverId} key={index}>
                  <ControlledPopover
                    targetId={popOverTargetId}
                    describesId={ariaDescribedBy}
                    header={header}
                    popoverText={popoverText}
                    popType="mobile"
                  />
                  {(colName === 'examRounds' &&
                    listOfExamRounds.map((exam, index) => <p key={index}>{exam}</p>)) || (
                    <p>{thisAnalysisObj[colName]}</p>
                  )}
                </td>
              )
            })}
          </tr>
        </tbody>
      </Table>
    </span>
  )
}

export default TableWithCourseData
