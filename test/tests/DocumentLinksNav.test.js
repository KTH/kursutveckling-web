/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
// eslint-disable-next-line no-shadow
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import i18n from '../../i18n'
import DocumentLinksNav from '../../public/js/app/components/DocumentLinksNav'
import mockWebContext from '../mocks/mockWebContext'
import mockCourseAnalysis from '../mocks/mockCourseAnalysis'
import { WebContextProvider } from '../../public/js/app/context/WebContext'

const { getAllByRole, getByText } = screen

const RenderDocumentLinksNav = ({ userLang = 'en', semester, koppsRoundId, ...rest }) => {
  const context = mockWebContext(userLang)

  return (
    <WebContextProvider configIn={context}>
      <DocumentLinksNav
        {...rest}
        translate={i18n.messages[userLang === 'en' ? 0 : 1].tableHeaders}
        staticAnalysisInfo={mockCourseAnalysis(semester, koppsRoundId)}
        lang={userLang}
      />
    </WebContextProvider>
  )
}
const setupOneRoundInEnglish = () => render(<RenderDocumentLinksNav userLang="en" semester="20172" koppsRoundId="1" />)
const setupOneRoundInSwedish = () => render(<RenderDocumentLinksNav userLang="sv" semester="20172" koppsRoundId="1" />)
const setupTwoRoundsInEnglish = () =>
  render(<RenderDocumentLinksNav userLang="en" semester="20192" koppsRoundId="1,2" />)
const setupTwoRoundsInSwedish = () =>
  render(<RenderDocumentLinksNav userLang="sv" semester="20192" koppsRoundId="1,2" />)

describe('User language: English. Component <DocumentLinksNav>: one ladok round id, one pdf memo', () => {

  test('renders links all three links', () => {
    setupOneRoundInEnglish()

    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2017-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2017_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Course analysis: 5 Sept 2019')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: Swedish. Component <DocumentLinksNav>: one ladok round id, one pdf memo', () => {
  test('renders a pdf links navigation for a table', () => {
    setupOneRoundInSwedish()
  })

  test('renders links three links', () => {
    setupOneRoundInSwedish()

    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Kursplan EI1220 ( HT 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=sv')

    expect(links[1]).toHaveTextContent('Kurs-PM EI1220 HT 2017-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2017_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Kursanalys: 2019-09-05')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: English. Component <DocumentLinksNav>: two ladok round ids, two pdf memos', () => {
  test('renders 1 course syllabus link, 2 memo pdf links and one course analysis', () => {
    setupTwoRoundsInEnglish()
    const links = getAllByRole('link')
    expect(links.length).toBe(4)
    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2019-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2019_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Course memo EI1220 Autumn 2019-2')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2019_2.pdf'
    )

    expect(links[3]).toHaveTextContent('Course analysis: 5 Sept 2019')
    expect(links[3].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: Swedish. Component <DocumentLinksNav>: two ladok round ids, two pdf memos', () => {
  test('renders 1 course syllabus link, 2 memo pdf links and one course analysis', () => {
    setupTwoRoundsInSwedish()
    const links = getAllByRole('link')
    expect(links.length).toBe(4)
    expect(links[0]).toHaveTextContent('Kursplan EI1220 ( HT 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=sv')

    expect(links[1]).toHaveTextContent('Kurs-PM EI1220 HT 2019-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2019_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Kurs-PM EI1220 HT 2019-2')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2019_2.pdf'
    )

    expect(links[3]).toHaveTextContent('Kursanalys: 2019-09-05')
    expect(links[3].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: English. Component <DocumentLinksNav>: two ladok round ids, one pdf memos and one web based', () => {
  test('renders 2 memo links (memo pdf and memo web based) and one course analysis', () => {
    render(<RenderDocumentLinksNav userLang="en" semester="20192" koppsRoundId="1,3" />)

    const links = getAllByRole('link')
    expect(links.length).toBe(4)

    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2019-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2019_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Course memo EI1220 Autumn 2019-3')
    expect(links[2].href).toStrictEqual('https://localhost:3000/kurs-pm/EI1220/memoEI1220201923')

    expect(links[3]).toHaveTextContent('Course analysis: 5 Sept 2019')
    expect(links[3].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: English. Component <DocumentLinksNav>: two ladok round ids, only one web based', () => {
  test('renders 1 active memo link for round 3 and one course analysis', () => {
    render(<RenderDocumentLinksNav userLang="en" semester="20192" koppsRoundId="3,9" />)

    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2019-3')
    expect(links[1].href).toStrictEqual('https://localhost:3000/kurs-pm/EI1220/memoEI1220201923')

    expect(links[2]).toHaveTextContent('Course analysis: 5 Sept 2019')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })

  test('renders disabled link for non-existing course memo for round 9', () => {
    render(<RenderDocumentLinksNav userLang="en" semester="20192" koppsRoundId="3,9" />)

    const disabledLink = getByText('No course memo added')
    expect(disabledLink).toBeInTheDocument()
  })
})

describe('User language: Swedish. Component <DocumentLinksNav>: two ladok round ids, only one web based', () => {
  test('renders 1 active memo link for round 3 and one course analysis', () => {
    render(<RenderDocumentLinksNav userLang="sv" semester="20192" koppsRoundId="3,9" />)

    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Kursplan EI1220 ( HT 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=sv')

    expect(links[1]).toHaveTextContent('Kurs-PM EI1220 Autumn 2019-3')
    expect(links[1].href).toStrictEqual('https://localhost:3000/kurs-pm/EI1220/memoEI1220201923')
    expect(links[2]).toHaveTextContent('Kursanalys: 2019-09-05')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })

  test('renders disabled link for non-existing course memo for round 9', () => {
    render(<RenderDocumentLinksNav userLang="sv" semester="20192" koppsRoundId="3,9" />)

    const disabledLink = getByText('Inget kurs-PM tillagt')
    expect(disabledLink).toBeInTheDocument()
  })
})
