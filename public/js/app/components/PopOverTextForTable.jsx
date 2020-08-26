import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

export const PopOverTextForTableHeaders = ({ translate, columnsArr, popOverId }) =>
  columnsArr.map((colName, index) => {
    const { header, popoverText } = translate[colName]

    return (
      <span key={'hiddenTexts-For-' + popOverId + colName}>
        <UncontrolledPopover
          trigger="legacy"
          placement="auto"
          target={'desktopPopOver' + popOverId + colName}
          key={'keyforDesktop' + popOverId + colName}
          className="header-popup"
        >
          <PopoverHeader>{header}</PopoverHeader>
          <PopoverBody>{popoverText}</PopoverBody>
        </UncontrolledPopover>
        <UncontrolledPopover
          trigger="legacy"
          placement="auto"
          target={'labelforMobilePopOver' + popOverId + colName}
          key={'keyforMobilePopOver' + popOverId + colName}
          className="header-popup"
        >
          <PopoverHeader>{header}</PopoverHeader>
          <PopoverBody>{popoverText}</PopoverBody>
        </UncontrolledPopover>
      </span>
    )
  })
