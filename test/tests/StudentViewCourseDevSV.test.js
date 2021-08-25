import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import i18n from '../../i18n'
import { StaticRouter } from 'react-router'
import StudentViewCourseDev from '../../public/js/app/pages/StudentViewCourseDev'
import mockAdminStore from '../mocks/mockAdminStore'

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText } = screen

const ROUNDS = [
  'CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska )',
  'CMEDT1 ( Startdatum 2018-10-29, Svenska )',
  'CITEH1 ( Startdatum 2018-10-29, Svenska )',
  'TCOMK1 ( Start date 17/01/2017, English ) , CINTE1 ( Start date 17/01/2017, Swedish )',
  'CMETE CSAMH ( Startdatum 2010-01-11, Svenska )',
  'CSAMH1 ( Startdatum 2009-01-12, Svenska )',
  'Med teknik ( Startdatum 2008-08-29, Svenska )',
  'CINTE CMIEL ( Startdatum 2008-08-29, Svenska )'
]

const TEST_ALERT_SAVE = {
  location: {
    pathname: '/kursutveckling/SF1624',
    search:
      '?serv=kutv&event=save&id=SF1624HT2019_9&term=20192&name=CMATD1%20m.fl.%20(%20Startdatum%202019-10-28,%20Svenska%20)',
    hash: '',
    state: undefined
  }
}
const CourseDevelopment = ({ userLang = 'en', ...rest }) => {
  return (
    <StaticRouter>
      <Provider adminStore={mockAdminStore(userLang)}>
        <StudentViewCourseDev {...rest} />
      </Provider>
    </StaticRouter>
  )
}

describe('User language: Swedish. Component <StudentViewCourseDev>', () => {
  beforeEach(() => {
    render(<CourseDevelopment userLang="sv" location={TEST_ALERT_SAVE.location} />)
  })
  test('renders a course development page', (done) => {
    done()
  })

  test('renders and check all headers on the place', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent('Kursens utveckling')
    const subHeader = getByText('SF1624 Algebra och geometri 7,5 hp')
    expect(subHeader).toBeTruthy()
  })

  //

  test('renders h2 for all years', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(9)
    const expectedh2ds = ['2021', '2020', '2019', '2018', '2017', '2016', '2010', '2009', '2008']
    expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('renders course rounds headers in Kursanalys lang', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(8)
    const expectedh3ds = ROUNDS
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('renders all h4 for Alert and each round Additional information headers, ', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(46)
    const expectedhds = [
      'Utkast för kursanalys och kursdata har sparats',
      //first round CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      'Kommentar till gjorda ändringar',
      //next round CMEDT1 ( Startdatum 2018-10-29, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      'Kommentar till gjorda ändringar',
      //next round CITEH1 ( Startdatum 2018-10-29, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      'Kommentar till gjorda ändringar',
      //next round TCOMK1 ( Start date 17/01/2017, English ) , CINTE1 ( Start date 17/01/2017, Swedish )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      'Kommentar till gjorda ändringar',
      //next round CMETE CSAMH ( Startdatum 2010-01-11, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      //no 'Kommentar till gjorda ändringar',
      //next round CSAMH1 ( Startdatum 2009-01-12, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      //no 'Kommentar till gjorda ändringar',
      //next round Med teknik ( Startdatum 2008-08-29, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      //no 'Kommentar till gjorda ändringar',
      //next round CINTE CMIEL ( Startdatum 2008-08-29, Svenska )
      'Kommentar till examination',
      'Obligatorisk inom program',
      'Kurstillfällen som ingår i kursomgång',
      'Publicerad första gången',
      'Senaste ändrad',
      'Kommentar till gjorda ändringar'
    ]
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('Get popover desktop and mobile buttons and check it is number', async () => {
    const allBtns = getAllByRole('button')
    expect(allBtns.length).toBe(96)
  })

  test('Get Kommentar till gjorda ändringar if it renders', async () => {
    const oneCommentAboutChanges = getByText('LKJHDFJ')
    const anotherCommentAboutChanges = getByText('kjhaew')
    expect(oneCommentAboutChanges).toBeInTheDocument()
    expect(anotherCommentAboutChanges).toBeInTheDocument()
  })

  test('Get some dates of data changes in course data or Kursanalys after publishing if it renders', async () => {
    const changeDates = getAllByText('2019-09-11')
    expect(changeDates.length).toBe(3)
  })

  test('Get No information inserted if no data changes in course data or Kursanalys after publishing if it renders', async () => {
    const changeDates = getAllByText('Ingen information tillagd')
    expect(changeDates.length).toBe(2)
  })

  test('Get Additional data about this course offering if it renders', async () => {
    const extraInfo = getAllByText('Ytterligare data om kursomgången')
    expect(extraInfo.length).toBe(8)
  })

  test('Check if aria-label is correct for Additional data about this course offering if it renders', async () => {
    const rounds = ROUNDS
    rounds.map((roundName, index) =>
      expect(screen.getByLabelText(`Ytterligare data om kursomgången: ${roundName}`)).toBeInTheDocument()
    )
  })

  test('Check links if it renders', async () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(18)
    const expectedLinks = [
      'Om kursen SF1624',
      'Administrera Om kursen',
      //by each round
      'Kursplan SF1624 ( HT 2019 - )',
      // 'Kurs-PM: 2019-09-10',
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
    const editLink = 'Ändra publicerad kursanalys och kursdata för kursomgång: '
    const expectedAriaLabels = [
      null,
      null,
      //by each round
      'PDF Kursplan SF1624 ( HT 2019 -  )',
      // 'PDF Kurs-PM CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska ): 2019-09-10',
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
    links.map((link, index) => expect(link.getAttribute('aria-label')).toBe(expectedAriaLabels[index]))
  })

  test('Links have a correct href', async () => {
    const links = getAllByRole('link')
    const linkAddresses = [
      'http://localhost/student/kurser/kurs/SF1624?l=sv',
      'http://localhost/kursinfoadmin/kurser/kurs/SF1624?l=sv',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=sv',
      // 'http://localhost/pm-SF1624HT2019_9.pdf',
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
    expect(memoNotAdded.length).toBe(9)
  })

  test('Get grade scale if it renders', async () => {
    const gradeScale = getAllByText('TEN1 (7,5) A, B, C, D, E, FX, F')
    expect(gradeScale.length).toBe(7)
  })

  test('Changes of the course before this course offering if it renders', async () => {
    const changes = getByText('fads')
    expect(changes).toBeInTheDocument()
  })

  test('Get table headers (mobile and desktop)', async () => {
    const responsible = getAllByText('Kursansvarig')
    expect(responsible.length).toBe(16)
    const examiner = getAllByText('Examinator')
    expect(examiner.length).toBe(16)
    const students = getAllByText('Studenter')
    expect(students.length).toBe(16)
    const exams = getAllByText('Examination')
    expect(exams.length).toBe(16)
    const results = getAllByText('Resultat')
    expect(results.length).toBe(16)
    const changes = getAllByText('Förändringar som har införts till den här kursomgången')
    expect(changes.length).toBe(16)
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
    const received = getByText('111 % *')
    expect(received).toBeInTheDocument()
  })

  test('Students RegisteredStudents were manually edited (*) if it renders', async () => {
    const received = getByText('111 *')
    expect(received).toBeInTheDocument()
  })

  test('Result ExaminationGrade were rendered with * if it renders', async () => {
    const received = getByText('13.3 %')
    expect(received).toBeInTheDocument()
  })
})
