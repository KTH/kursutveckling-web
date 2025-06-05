import React from 'react'

const ActiveOrDisabledLink: React.FC<{
  href?: string
  linkTitle: string
  disabled?: boolean
  isPdf?: boolean
  ariaLabel?: string
}> = ({ href, linkTitle, disabled = false, isPdf = false, ariaLabel: ariaLabelOverride = undefined }) => {
  const classNames = getClassNames(disabled, isPdf)
  const pdfOptions = getPdfOptions(isPdf)
  const ariaLabel = getAriaLabel(ariaLabelOverride, isPdf, linkTitle)

  return disabled ? (
    <span className={classNames}>
      <i>{linkTitle}</i>
    </span>
  ) : (
    <a title={linkTitle} href={href} className={classNames} {...pdfOptions} {...ariaLabel}>
      {linkTitle}
    </a>
  )
}

export default ActiveOrDisabledLink

const getClassNames = (disabled: boolean, isPdf: boolean) => {
  const baseClass = 'link'
  const disabledClass = disabled ? 'disabled-link' : ''
  const pdfClass = isPdf ? 'pdf-link' : ''

  return [baseClass, disabledClass, pdfClass].filter(Boolean).join(' ').trim()
}

const getPdfOptions = (isPdf: boolean) => {
  if (!isPdf) return {}

  return {
    target: '_blank',
    rel: 'noreferrer'
  }
}

const getAriaLabel = (ariaLabelOverride?: string, isPdf?: boolean, linkTitle?: string) => {
  if (!ariaLabelOverride && !isPdf) return {}

  const label = ariaLabelOverride ?? linkTitle
  return { 'aria-label': isPdf ? `PDF ${label}` : label }
}
