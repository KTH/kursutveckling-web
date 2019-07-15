import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

export const PopoverExamItem = ({examShortAndLongStrArr, id}) => {
  return (
    <UncontrolledPopover trigger='click' placement='left-start' target={id}>
      <PopoverBody>
        {examShortAndLongStrArr.map((shortAndLongTextStr, index) => <p className='popOver' key={index}>{shortAndLongTextStr[1]}</p>)}
      </PopoverBody>
    </UncontrolledPopover>
  )
}

export const PopOverTextForTableHeaders = ({translate, columnsArr, popOverId}) => {
  console.log('columnsArr', columnsArr, translate, popOverId)
  return (
    columnsArr.map((colName, index) => {
      <UncontrolledPopover trigger='click' placement='top' target={popOverId + index} key={index}>
        <PopoverHeader>{translate[colName].header}</PopoverHeader>
        <PopoverBody>
          {translate[colName].popoverText}
        </PopoverBody>
      </UncontrolledPopover>
    })
  )
}
