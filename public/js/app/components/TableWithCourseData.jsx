import React from 'react'
import { Button, Table } from 'reactstrap'
import { PopOverTextForTableHeaders } from './PopOverTextForTable'

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

const OnlyMobileVisiblePopup = ({ popUpHeader, id }) => {
  return (
    <span className="mobile-header-popovers" key={'onlyForMobileView' + popUpHeader + id}>
      <label>{popUpHeader}</label>{' '}
      <Button id={id} type="button" className="mobile btn-info-modal" />{' '}
    </span>
  )
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
            {orderedColumns.map((colName, index) => (
              <th key={index} className={colName}>
                {translate[colName].header}{' '}
                <Button
                  id={'targetforDesktopPopOver' + popOverId + colName}
                  type="button"
                  className="desktop btn-info-modal"
                />{' '}
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
                  id={'targetforMobilePopOver' + popOverId + colName}
                />
                {(colName === 'examRounds' &&
                  listOfExamRounds.map((exam, index) => <p key={index}>{exam}</p>)) || (
                  <p>{thisAnalysisObj[colName]}</p>
                )}
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
