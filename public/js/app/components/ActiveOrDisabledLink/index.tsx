import React from 'react'

const ActiveOrDisabledLink: React.FC<{
  href?: string
  linkTitle: string
  className?: string
  disabled?: boolean
}> = ({ href, linkTitle, className = '', disabled = false }) => {
  const linkClassName = `link ${className} ${disabled ? 'disabled-link' : ''}`.trim()

  return disabled ? (
    <span className={linkClassName}>
      <i>{linkTitle}</i>
    </span>
  ) : (
    <a href={href} className={linkClassName} target="_blank" rel="noreferrer" title={linkTitle}>
      {linkTitle}
    </a>
  )
}

export default ActiveOrDisabledLink
