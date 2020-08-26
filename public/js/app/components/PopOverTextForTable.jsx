import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

export const PopOverTextForTableHeaders = ({ translate, columnsArr, popOverId }) => {
  return columnsArr.map((apiColName, index) => (
    <span>
      <UncontrolledPopover
        trigger="legacy"
        placement="auto"
        target={popOverId + apiColName}
        key={'desktop' + index}
        className="header-popup"
      >
        <PopoverHeader>{translate[apiColName].header}</PopoverHeader>
        <PopoverBody>{translate[apiColName].popoverText}</PopoverBody>
      </UncontrolledPopover>
      <UncontrolledPopover
        trigger="legacy"
        placement="auto"
        target={'labelfor' + popOverId + apiColName}
        key={'mobile' + index}
        className="header-popup"
      >
        <PopoverHeader>{translate[apiColName].header}</PopoverHeader>
        <PopoverBody>{translate[apiColName].popoverText}</PopoverBody>
      </UncontrolledPopover>
    </span>
  ))
}
