/* eslint-disable react/no-danger */
import React from 'react'

interface HtmlWrapperProps {
  id: string // ID for the HTML element
  html: string // HTML string to render
  mode?: 'inline' | 'block' // Mode determines the element type
}

const HtmlWrapper: React.FC<HtmlWrapperProps> = ({ id, mode, html }) => {
  switch (mode) {
    case 'inline':
      return <span id={id} dangerouslySetInnerHTML={{ __html: html }} />
    default:
      return <div id={id} dangerouslySetInnerHTML={{ __html: html }} />
  }
}

export default HtmlWrapper
