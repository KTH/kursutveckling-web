import React from 'react'
import { Table, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

const PopoverExamItem = ({header, shortAndLongExamStrArr, id}) => {
  return (
    <UncontrolledPopover trigger='click' placement='left-start' target={id}>
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>
        {shortAndLongExamStrArr.map((shortAndLongTextStr, index) => <p className='popOver' key={index}>{shortAndLongTextStr[1]}</p>)}
      </PopoverBody>
    </UncontrolledPopover>
  )
}

const TableWithCourseData = ({translate, courseRoundData, popOverId}) => {
  function getShortAndLongStrForEachExam (examinationRoundsArr) {
    let shortAndLongExamStrArr = []
    if (examinationRoundsArr && examinationRoundsArr.length > 0) {
      shortAndLongExamStrArr = examinationRoundsArr.map(row => {
        let examInfoArr = row.trim().split(';')
        let shortStr = `${examInfoArr[0]} (${examInfoArr[2]}) ${examInfoArr[5]}` || ''
        let longStr = `${examInfoArr[0]} - ${examInfoArr[1]},  ${examInfoArr[2]} ${examInfoArr[3]}, ${examInfoArr[4]}: ${examInfoArr[5]}` || ''
        return [shortStr, longStr]
      })
    }
    return shortAndLongExamStrArr
  }
  const shortAndLongExamStrArr = getShortAndLongStrForEachExam(courseRoundData.examinationRounds)

  return (
    <span>
      <Table>
        <thead>
          <tr>
            <th>{translate.header_responsibles}</th>
            <th>{translate.header_examiners}</th>
            <th alt='Antal reg studenter'>{translate.header_registrated}</th>
            <th>{translate.header_examination}</th>
            <th alt='; i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'>{translate.header_examination_grade}</th>
            <th>{translate.header_course_changes_comment}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='teacher-cell' data-label={translate.header_responsibles}>
              <p>{courseRoundData.responsibles}</p>
            </td>
            <td className='teacher-cell' data-label={translate.header_examiners}>
              <p>{courseRoundData.examiners}</p>
            </td>
            <td className='students-cell' data-label={translate.header_registrated}>
              {courseRoundData.registeredStudents}
            </td>
            <td className='exam-cell' id={popOverId} data-label={translate.header_examination}>
              {shortAndLongExamStrArr.map((shortAndLongTextStr, index) => <p key={index}>{shortAndLongTextStr[0]}</p>)}
              <p><i>{translate.popover_more}</i></p>
            </td>
            <td className='result-cell' data-label={translate.header_examination_grade}>
              <p>{courseRoundData.examinationGrade} %</p>
            </td>
            <td data-label={translate.header_course_changes_comment}>
              <p>{courseRoundData.alterationText}</p>
            </td>
          </tr>
        </tbody>
      </Table>
      <PopoverExamItem header={translate.header_examination} shortAndLongExamStrArr={shortAndLongExamStrArr} id={popOverId} />
    </span>
  )
}

export default TableWithCourseData
