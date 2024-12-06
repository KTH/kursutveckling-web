import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StudentViewCourseDev from '../../public/js/app/pages/StudentViewCourseDev'
import mockAdminStore from '../mocks/mockAdminStore'
import { WebContextProvider } from '../../public/js/app/context/WebContext'

const { getAllByRole, getAllByText, getByText } = screen
const userLang = 'sv'
const context = mockAdminStore(userLang)

const ROUNDS = [
  'doktorand 2024-51460 ( Start date 28 Oct 2024, English )',
  'CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska )',
  'CMEDT1 ( Startdatum 2018-10-29, Svenska )',
  'CITEH1 ( Startdatum 2018-10-29, Svenska )',
  'TCOMK1 ( Start date 17/01/2017, English ) , CINTE1 ( Start date 17/01/2017, Swedish )',
  'CMETE CSAMH ( Startdatum 2010-01-11, Svenska )',
  'CSAMH1 ( Startdatum 2009-01-12, Svenska )',
  'Med teknik ( Startdatum 2008-08-29, Svenska )',
  'CINTE CMIEL ( Startdatum 2008-08-29, Svenska )'
]

const CourseDevelopment = () => (
  <WebContextProvider configIn={context}>
    <StudentViewCourseDev />
  </WebContextProvider>
)

describe('User language: Swedish. Component <StudentViewCourseDev>', () => {
  beforeEach(() => render(<CourseDevelopment />))
  test('renders a course development page', (done) => {
    done()
  })

  test('renders and check all headers on the place', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent('Kursens utveckling')
    const subHeader = getByText('SF1624 Algebra och geometri 7,5 hp')
    expect(subHeader).toBeInTheDocument()
  })

  test('renders h4 for all years', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(10)
  })

  test('renders h3 for all analysis name headers', () => {
    const allH4Headers = getAllByRole('heading', { level: 3 })
    expect(allH4Headers.length).toBe(10)
  })

  test('renders popover buttons ', async () => {
    const allBtns = getAllByRole('button')
    expect(allBtns.length).toBe(20)
  })

  test('Get No information inserted if no data changes in course data or Kursanalys after publishing if it renders', async () => {
    const changeDates = getAllByText('Ingen information tillagd')
    expect(changeDates.length).toBe(16)
  })

  test('Check links if it renders', async () => {
    const links = screen.getAllByRole('link')

    expect(links.length).toBe(21)
    const expectedLinks = [
      'Om kursen SF1624',
      'Administrera Om kursen',
      // '”Riktlinje om kursvärdering och kursanalys”',
      'Arkiv',
      // by each round
      'Kursplan SF1624 ( HT 2019 - )',
      'Kursplan SF1624 ( HT 2019 - )',
      'Kursplan SF1624 ( HT 2019 - )',
      'Kursanalys: 2019-09-10',
      'Kursplan SF1624 ( HT 2010 - VT 2019 )',
      'Kursanalys: 2019-09-04',
      'Kursplan SF1624 ( HT 2010 - VT 2019 )',
      'Kursanalys: 2019-09-11',
      'Kursplan SF1624 ( HT 2010 - VT 2019 )',
      'Kursanalys: 2019-10-09',
      'Kursplan SF1624 ( HT 2009 - VT 2010 )',
      'Kursanalys: 2019-10-08',
      'Kursplan SF1624 ( HT 2008 - VT 2009 )',
      'Kursanalys: 2019-09-09',
      'Kursplan SF1624 ( HT 2008 - VT 2009 )',
      'Kursanalys: 2019-09-03',
      'Kursplan SF1624 ( HT 2008 - VT 2009 )',
      'Kursanalys: 2019-10-08'
    ]

    links.map((l, index) => expect(l).toHaveTextContent(expectedLinks[index]))
  })

  test('Check if aria-label is correct for PDF links', async () => {
    const links = screen.getAllByRole('link')
    const linksWithAriaLabels = links.slice(3)

    const expectedAriaLabels = [
      // by each round
      'PDF Kursplan SF1624 ( HT 2019 -  )',
      'PDF Kursplan SF1624 ( HT 2019 -  )',
      'PDF Kursplan SF1624 ( HT 2019 -  )',
      'PDF Kursanalys CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska ): 2019-09-10',
      'PDF Kursplan SF1624 ( HT 2010 - VT 2019 )',
      'PDF Kursanalys CMEDT1 ( Startdatum 2018-10-29, Svenska ): 2019-09-04',
      'PDF Kursplan SF1624 ( HT 2010 - VT 2019 )',
      'PDF Kursanalys CITEH1 ( Startdatum 2018-10-29, Svenska ): 2019-09-11',
      'PDF Kursplan SF1624 ( HT 2010 - VT 2019 )',
      'PDF Kursanalys TCOMK1 ( Start date  17/01/2017, English ) ,  CINTE1 ( Start date  17/01/2017, Swedish ): 2019-10-09',
      'PDF Kursplan SF1624 ( HT 2009 - VT 2010 )',
      'PDF Kursanalys CMETE CSAMH ( Startdatum 2010-01-11, Svenska ): 2019-10-08',
      'PDF Kursplan SF1624 ( HT 2008 - VT 2009 )',
      'PDF Kursanalys CSAMH1 ( Startdatum 2009-01-12, Svenska ): 2019-09-09',
      'PDF Kursplan SF1624 ( HT 2008 - VT 2009 )',
      'PDF Kursanalys Med teknik ( Startdatum 2008-08-29, Svenska ): 2019-09-03',
      'PDF Kursplan SF1624 ( HT 2008 - VT 2009 )',
      'PDF Kursanalys CINTE CMIEL ( Startdatum 2008-08-29, Svenska ): 2019-10-08'
    ]
    linksWithAriaLabels.map((link, index) => expect(link).toHaveAttribute('aria-label', expectedAriaLabels[index]))
  })

  test('Links have a correct href', async () => {
    const links = getAllByRole('link')
    const linkAddresses = [
      'http://localhost/student/kurser/kurs/SF1624?l=sv',
      'http://localhost/kursinfoadmin/kurser/kurs/SF1624?l=sv',
      'http://localhost/kursutveckling/SF1624/arkiv',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=sv',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=sv',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=sv',
      'http://localhost/analysis-SF1624HT2019_9.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=sv',
      'http://localhost/analysis-SF1624HT2018_9.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=sv',
      'http://localhost/analysis-SF1624HT2018_6.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=sv',
      'http://localhost/analysis-SF1624VT2017_1_2.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20092.pdf?lang=sv',
      'http://localhost/analysis-SF1624VT2010_1.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=sv',
      'http://localhost/analysis-SF1624VT2009_1.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=sv',
      'http://localhost/analysis-SF1624HT2008_5.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=sv',
      'http://localhost/analysis-SF1624HT2008_1.pdf'
    ]
    links.map((link, index) => expect(link.href).toStrictEqual(linkAddresses[index]))
  })

  test('check how behave memo link when no memo is added', async () => {
    const memoNotAdded = screen.getAllByText('Inget kurs-PM tillagt')
    expect(memoNotAdded.length).toBe(11)
  })

  test('Changes of the course before this course offering if it renders', async () => {
    const changes = getByText('fads')
    expect(changes).toBeInTheDocument()
  })

  test('Get table headers (mobile and desktop)', async () => {
    const responsible = getAllByText('Kursansvarig')
    expect(responsible.length).toBe(10)
    const examiner = getAllByText('Examinator')
    expect(examiner.length).toBe(10)
    const students = getAllByText('Studenter')
    expect(students.length).toBe(10)
    const examinationGrade = getAllByText('Examinationsgrad')
    expect(examinationGrade.length).toBe(8)
    const gradingDistribution = getAllByText('Resultat på kurs')
    expect(gradingDistribution.length).toBe(2)
    const changes = getAllByText('Förändringar som har införts till den här kursomgången')
    expect(changes.length).toBe(8)
    const changesNext = getAllByText('Förändringar som införs till nästa kursomgång')
    expect(changesNext.length).toBe(10)
  })

  test('Coordinator names if it renders', async () => {
    const names = getAllByText('Testovich3 Person3')
    expect(names.length).toBe(1)
  })

  test('Examiners names if it renders', async () => {
    const names = getAllByText('Test Person Testovich, Test2 Person2 Testovich2')
    expect(names.length).toBe(8)
  })

  test('Result ExaminationGrade were manually edited (*) if it renders', async () => {
    const received = getByText('111%*')
    expect(received).toBeInTheDocument()
  })

  test('Students RegisteredStudents were manually edited (*) if it renders', async () => {
    const received = getByText('111*')
    expect(received).toBeInTheDocument()
  })

  test('Result ExaminationGrade were rendered with * if it renders', async () => {
    const received = getByText('13.3%')
    expect(received).toBeInTheDocument()
  })

  test('renders document links', () => {
    const links = getAllByRole('link')
    expect(links.length).toBe(21)
    expect(links[3]).toHaveTextContent('Kursplan SF1624 ( HT 2019 - )')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=sv')

    expect(links[6]).toHaveTextContent('Kursanalys: 2019-09-10')
    expect(links[6].href).toStrictEqual('http://localhost/analysis-SF1624HT2019_9.pdf')

    expect(links[14]).toHaveTextContent('Kursanalys: 2019-10-08')
    expect(links[14].href).toStrictEqual('http://localhost/analysis-SF1624VT2010_1.pdf')
  })
})
