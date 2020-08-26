import React from 'react'
import { Button, Table } from 'reactstrap'
import { PopOverTextForTableHeaders } from './PopOverTextForTable'

function _getShortStrForEachExam(examinationRoundsArr) {
  let shortExamStrArr = []
  if (examinationRoundsArr && examinationRoundsArr.length > 0) {
    shortExamStrArr = examinationRoundsArr.map(row => {
      const examInfoArr = row.trim().split(';')
      return `${examInfoArr[0]} (${examInfoArr[2]}) ${examInfoArr[5]}` || ''
    })
  }
  return shortExamStrArr
}

const OnlyMobileVisiblePopup = ({ popUpHeader, id }) => {
  return (
    <span className="mobile-header-popovers">
      <label>{popUpHeader}</label>{' '}
      <Button id={id} type="button" className="mobile btn-info-modal" />{' '}
    </span>
  )
}

const TableWithCourseData = ({ translate, thisOfferingCourseData }) => {
  const { examinationRounds, _id: popOverId } = thisOfferingCourseData
  const examRounds = _getShortStrForEachExam(examinationRounds)
  const courseDataThisRoundInfo = { ...thisOfferingCourseData, ...examRounds }
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
            {orderedColumns.map((colName, index) => (
              <th key={index} className={colName}>
                {translate[colName].header}{' '}
                <Button id={popOverId + colName} type="button" className="desktop btn-info-modal" />{' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {orderedColumns.map((colName, index) => (
              <td className={colName} id={colName + popOverId} key={index}>
                <OnlyMobileVisiblePopup
                  popUpHeader={translate[colName].header}
                  id={'labelfor' + popOverId + colName}
                />
                <p>{courseDataThisRoundInfo[colName]}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
      <PopOverTextForTableHeaders
        columnsArr={orderedColumns}
        translate={translate}
        popOverId={popOverId}
      />
    </span>
  )
}

export default TableWithCourseData
