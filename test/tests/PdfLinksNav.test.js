import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import i18n from '../../i18n'
import { StaticRouter } from 'react-router'
import PdfLinksNav from '../../public/js/app/components/PdfLinksNav'
import mockRouterStore from '../mocks/mockRouterStore'
import mockedMiniMemosPdfAndWeb from '../mocks/mockMiniMemos'
import mockCourseAnalysis from '../mocks/mockCourseAnalysis'

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText } = screen

const RenderPdfLinksNav = ({ userLang = 'en', semester, koppsRoundId, ...rest }) => {
  const rS = mockRouterStore(userLang)
  return (
    <StaticRouter>
      <Provider
        adminStore={{
          ...rS,
          ...mockedMiniMemosPdfAndWeb
        }}
      >
        <PdfLinksNav
          {...rest}
          translate={i18n.messages[userLang === 'en' ? 0 : 1].tableHeaders}
          staticAnalysisInfo={mockCourseAnalysis(semester, koppsRoundId)}
          lang={userLang}
        />
      </Provider>
    </StaticRouter>
  )
}

describe('User language: English. Component <PdfLinksNav>: one ladok round id, one pdf memo', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="en" semester="20172" koppsRoundId="1" />)
  })
  test('renders a pdf links navigation for a table', (done) => {
    done()
  })

  test('renders links all three links', () => {
    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2017-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2017_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Course analysis: 05/09/2019')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: Swedish. Component <PdfLinksNav>: one ladok round id, one pdf memo ', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="sv" semester="20172" koppsRoundId="1" />)
  })
  test('renders a pdf links navigation for a table', (done) => {
    done()
  })

  test('renders links three links', () => {
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

describe('User language: English. Component <PdfLinksNav>: two ladok round ids, two pdf memos', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="en" semester="20192" koppsRoundId="1,2" />)
  })

  test('renders 1 course syllabus link, 2 memo pdf links and one course analysis', () => {
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

    expect(links[3]).toHaveTextContent('Course analysis: 05/09/2019')
    expect(links[3].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: Swedish. Component <PdfLinksNav>: two ladok round ids, two pdf memos', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="sv" semester="20192" koppsRoundId="1,2" />)
  })

  test('renders 1 course syllabus link, 2 memo pdf links and one course analysis', () => {
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

describe('User language: English. Component <PdfLinksNav>: two ladok round ids, one pdf memos and one web based', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="en" semester="20192" koppsRoundId="1,3" />)
  })

  test('renders 2 memo links (memo pdf and memo web based) and one course analysis', () => {
    const links = getAllByRole('link')
    expect(links.length).toBe(4)

    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2019-1')
    expect(links[1].href).toStrictEqual(
      'https://kursinfostoragestage.blob.core.windows.net/memo-blob-container/pm-EI1220HT2019_1.pdf'
    )

    expect(links[2]).toHaveTextContent('Course memo EI1220 Autumn 2019-3')
    expect(links[2].href).toStrictEqual('http://localhost/kurs-pm/EI1220/memoEI1220201923')

    expect(links[3]).toHaveTextContent('Course analysis: 05/09/2019')
    expect(links[3].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })
})

describe('User language: English. Component <PdfLinksNav>: two ladok round ids, only one web based', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="en" semester="20192" koppsRoundId="3,9" />)
  })

  test('renders 1 active memo link for round 3 and one course analysis', () => {
    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Course syllabus EI1220 ( Autumn 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=en')

    expect(links[1]).toHaveTextContent('Course memo EI1220 Autumn 2019-3')
    expect(links[1].href).toStrictEqual('http://localhost/kurs-pm/EI1220/memoEI1220201923')

    expect(links[2]).toHaveTextContent('Course analysis: 05/09/2019')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })

  test('renders disabled link for non-existing course memo for round 9', () => {
    const disabledLink = getByText('No course memo added')
    expect(disabledLink).toBeInTheDocument()
  })
})

describe('User language: Swedish. Component <PdfLinksNav>: two ladok round ids, only one web based', () => {
  beforeEach(() => {
    render(<RenderPdfLinksNav userLang="sv" semester="20192" koppsRoundId="3,9" />)
  })

  test('renders 1 active memo link for round 3 and one course analysis', () => {
    const links = getAllByRole('link')
    expect(links.length).toBe(3)
    expect(links[0]).toHaveTextContent('Kursplan EI1220 ( HT 2014 - )')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/EI1220-20142.pdf?lang=sv')

    expect(links[1]).toHaveTextContent('Kurs-PM EI1220 Autumn 2019-3')
    expect(links[1].href).toStrictEqual('http://localhost/kurs-pm/EI1220/memoEI1220201923')
    expect(links[2]).toHaveTextContent('Kursanalys: 2019-09-05')
    expect(links[2].href).toStrictEqual(
      'https://kursinfostoragestage/kursutveckling-blob-container/analysis-EI1220HT2017_1.pdf'
    )
  })

  test('renders disabled link for non-existing course memo for round 9', () => {
    const disabledLink = getByText('Inget kurs-PM tillagt')
    expect(disabledLink).toBeInTheDocument()
  })
})
