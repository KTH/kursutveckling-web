import React from 'react'
import HtmlWrapper from '../HtmlWrapper'

const AlterationTextBox: React.FC<{ header: string; htmlContent: string }> = ({ header, htmlContent }) => (
  <div className="info-box">
    <h4>{header}</h4>
    <HtmlWrapper id="alteration-text" html={htmlContent} />
  </div>
)

export default AlterationTextBox
