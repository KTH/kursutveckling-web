import React from 'react'
import { useWebContext } from '../../context/WebContext'
import i18n from '../../../../../i18n'
import ActiveOrDisabledLink from '../ActiveOrDisabledLink'
import { getDateFormat } from '../../util/helpers'

const LinkToCourseAnalysis: React.FC<{ analysisName: string; analysisFileName: string; pdfAnalysisDate: string }> = ({
  analysisName,
  analysisFileName,
  pdfAnalysisDate
}) => {
  const [{ browserConfig, userLang }] = useWebContext()

  const { storageUri } = browserConfig

  const translate = i18n.messages[userLang === 'en' ? 0 : 1]
  const { label } = translate.tableHeaders.analysisLink

  const validFrom = getDateFormat(pdfAnalysisDate, userLang)
  return (
    <ActiveOrDisabledLink
      ariaLabel={`PDF ${label} ${analysisName}`}
      href={`${storageUri}${analysisFileName}`}
      className="pdf-link"
      linkTitle={`${label}${validFrom ? ': ' + validFrom : ''}`}
    />
  )
}

export default LinkToCourseAnalysis
