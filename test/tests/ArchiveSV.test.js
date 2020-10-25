import React from 'react'
import { Provider } from 'mobx-react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { StaticRouter } from 'react-router'

import Archive from '../../public/js/app/pages/Archive'
import mockArchiveStore from '../mocks/mockArchiveStore'

import i18n from '../../i18n'

const { getAllByRole, getAllByLabelText } = screen

const userLang = 'sv'
const courseCode = 'SF1624'
const subHeaderText = 'SF1624 Algebra and Geometry, 7,5 credits'
const courseKoppsData = { syllabusPeriods: { 19701: { endDate: 20372 } } }

const translation = i18n.message('archiveTitles', userLang)

const ArchivePage = () => {
  return (
    <StaticRouter>
      <Provider
        archiveStore={mockArchiveStore({
          userLang,
          courseCode,
          subHeadline: subHeaderText,
          courseKoppsData
        })}
      >
        <Archive />
      </Provider>
    </StaticRouter>
  )
}

describe(`User language: ${userLang}. Component <Archive>`, () => {
  beforeEach(() => {
    render(<ArchivePage />)
  })

  test('renders and check all headers', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(translation.archive)

    const allSubHeaders = getAllByLabelText(subHeaderText)
    expect(allSubHeaders.length).toBe(1)

    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(1)
    expect(allH2Headers[0]).toHaveTextContent(translation.label_syllabuses)
  })

  test('renders syllabus table', () => {
    const syllabusTable = getAllByRole('table')
    expect(syllabusTable.length).toBe(1)
  })
})
