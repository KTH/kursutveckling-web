import { Col } from 'reactstrap'
import ControlledPopover from '../ControlledPopover'
import React from 'react'

const GridCell: React.FC<{
  id: string
  header: string
  content: React.ReactNode
  popoverText?: string
  md?: string
}> = ({ id, header, content, popoverText, md = '4' }) => (
  <Col md={md} className={`grid-cell`}>
    <h5 className="cell-header">
      {header}
      {popoverText && <ControlledPopover id={id} header={header} popoverText={popoverText} />}
    </h5>
    <span className="cell-content">{content}</span>
  </Col>
)

export default GridCell
