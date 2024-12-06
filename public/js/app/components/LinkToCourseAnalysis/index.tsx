import React from 'react'
import { useWebContext } from '../../context/WebContext'
import i18n from '../../../../../i18n'
import ActiveOrDisabledLink from '../ActiveOrDisabledLink'
import { getDateFormat } from '../../util/helpers'

const LinkToCourseAnalysis: React.FC<{
  analysisName: string
  analysisFileName: string
  pdfAnalysisDate: string
}> = ({ analysisName, analysisFileName, pdfAnalysisDate }) => {
  const [{ browserConfig, userLang }] = useWebContext()
  const { storageUri } = browserConfig

  const { header } = i18n.messages[userLang === 'en' ? 0 : 1]?.analysisHeaders?.analysisLink

  const validFrom = getDateFormat(pdfAnalysisDate, userLang)
  const ariaLabel = `PDF ${header} ${analysisName}${validFrom ? `: ${validFrom}` : ''}`
  const linkTitle = `${header}${validFrom ? `: ${validFrom}` : ''}`
  const href = `${storageUri}${analysisFileName}`

  return <ActiveOrDisabledLink ariaLabel={ariaLabel} href={href} className="pdf-link" linkTitle={linkTitle} />
}

export default LinkToCourseAnalysis
