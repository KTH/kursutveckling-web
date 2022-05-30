import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { WebContextProvider } from '../../public/js/app/context/WebContext'

import Archive from '../../public/js/app/pages/Archive'
import mockArchiveStore from '../mocks/mockArchiveStore'

import i18n from '../../i18n'

const { getAllByRole, getAllByLabelText } = screen
const userLang = 'sv'
const context = mockArchiveStore(userLang)
const translation = i18n.message('archiveTitles', userLang)

const ArchivePage = () => (
  <WebContextProvider configIn={context}>
    <Archive />
  </WebContextProvider>
)

describe(`User language: ${userLang}. Component <Archive>`, () => {
  test('renders and check all headers', () => {
    render(<ArchivePage />)

    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(translation.archive)

    const allSubHeaders = getAllByLabelText(context.subHeaderText)
    expect(allSubHeaders.length).toBe(1)

    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(3)
    expect(allH2Headers[0]).toHaveTextContent(translation.label_syllabuses)
    expect(allH2Headers[1]).toHaveTextContent(translation.label_memos)
  })

  test('renders syllabus, memo and analyses table', () => {
    render(<ArchivePage />)

    const syllabusTable = getAllByRole('table')
    expect(syllabusTable.length).toBe(3)
  })
})
