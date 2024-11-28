import React from 'react'

const ActiveOrDisabledLink: React.FC<{
  ariaLabel: string
  href?: string
  linkTitle: string
  className?: string
  disabled?: boolean
}> = ({ ariaLabel, href, linkTitle, className = '', disabled = false }) => {
  return disabled ? (
    <span className={`${className} disabled-link`}>
      <i>{linkTitle}</i>
    </span>
  ) : (
    <a aria-label={ariaLabel} href={href} className={className} target="_blank" rel="noreferrer" title={linkTitle}>
      {linkTitle}
    </a>
  )
}

export default ActiveOrDisabledLink
