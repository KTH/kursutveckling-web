import React from 'react'

const ActiveOrDisabledLink: React.FC<{
  ariaLabel: string
  href?: string
  linkTitle: string
  className?: string
  disabled?: boolean
}> = ({ ariaLabel, href, linkTitle, className = '', disabled = false }) => {
  const linkClassName = `link ${className} ${disabled ? 'disabled-link' : ''}`.trim()

  return disabled ? (
    <span className={linkClassName} aria-label={ariaLabel}>
      <i>{linkTitle}</i>
    </span>
  ) : (
    <a aria-label={ariaLabel} href={href} className={linkClassName} target="_blank" rel="noreferrer" title={linkTitle}>
      {linkTitle}
    </a>
  )
}

export default ActiveOrDisabledLink
