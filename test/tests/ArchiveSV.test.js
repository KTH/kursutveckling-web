import React from 'react'
import { Provider } from 'mobx-react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { StaticRouter } from 'react-router'

import Archive from '../../public/js/app/pages/Archive'
import mockArchiveStore from '../mocks/mockArchiveStore'

import i18n from '../../i18n'

const { getAllByRole } = screen
const userLang = 'sv'
const translation = i18n.message('archiveTitles', userLang)

const ArchivePage = () => {
  return (
    <StaticRouter>
      <Provider archiveStore={mockArchiveStore(userLang)}>
        <Archive />
      </Provider>
    </StaticRouter>
  )
}

describe(`User language: ${userLang}. Component <Archive>`, () => {
  beforeEach(() => {
    render(<ArchivePage userLang={userLang} />)
  })

  test('renders and check all headers', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(translation.archive_header)
  })
})
