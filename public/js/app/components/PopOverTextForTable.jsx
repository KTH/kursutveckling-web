import React from 'react'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'

export const PopOverTextForTableHeaders = ({ translate, columnsArr, popOverId }) =>
  columnsArr.map((colName, index) => {
    const { header, popoverText } = translate[colName]

    return (
      <span key={'hiddenTexts-For-' + popOverId + colName}>
        {['targetforDesktopPopOver', 'targetforMobilePopOver'].map(triggerId => (
          <UncontrolledPopover
            trigger="legacy"
            placement="bottom-start"
            target={triggerId + popOverId + colName}
            key={triggerId + popOverId + colName}
          >
            <PopoverHeader>{header}</PopoverHeader>
            <PopoverBody>{popoverText}</PopoverBody>
          </UncontrolledPopover>
        ))}
      </span>
    )
  })
