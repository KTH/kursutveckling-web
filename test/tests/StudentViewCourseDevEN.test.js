import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import StudentViewCourseDev from '../../public/js/app/pages/StudentViewCourseDev'
import mockAdminStore from '../mocks/mockAdminStore'

const { getAllByRole, getAllByText, getByText } = screen

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

describe('User language: English. Component <StudentViewCourseDev>', () => {
  beforeEach(() => {
    render(<CourseDevelopment userLang="en" location={TEST_ALERT_SAVE.location} />)
  })
  test('renders a course development page', (done) => {
    done()
  })

  test('renders and check all headers on the place', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent(
      'Course developmentSF1624 Algebra and Geometry 7.5 credits'
    )
  })

  test('renders h2 for all years', () => {
    const allH2Headers = getAllByRole('heading', { level: 2 })
    expect(allH2Headers.length).toBe(9)
    const expectedh2ds = ['2020', '2019', '2018', '2017', '2016', '2015', '2010', '2009', '2008']
    expectedh2ds.map((h2, index) => expect(allH2Headers[index]).toHaveTextContent(h2))
  })

  test('renders course rounds headers in course analysis lang', () => {
    const allH3Headers = getAllByRole('heading', { level: 3 })
    expect(allH3Headers.length).toBe(8)
    const expectedh3ds = ROUNDS
    expectedh3ds.map((h3, index) => expect(allH3Headers[index]).toHaveTextContent(h3))
  })

  test('renders all h4 for Alert and each round Additional information headers.', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(46)
    const expectedhds = [
      'Draft for course analysis and course data has been saved',
      // first round CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      'Comments to changes in course data or course analysis after publishing',
      // next round CMEDT1 ( Startdatum 2018-10-29, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      'Comments to changes in course data or course analysis after publishing',
      // next round CITEH1 ( Startdatum 2018-10-29, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      'Comments to changes in course data or course analysis after publishing',
      // next round TCOMK1 ( Start date 17/01/2017, English ) , CINTE1 ( Start date 17/01/2017, Swedish )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      'Comments to changes in course data or course analysis after publishing',
      // next round CMETE CSAMH ( Startdatum 2010-01-11, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      // no 'Comments to changes in course data or course analysis after publishing',
      // next round CSAMH1 ( Startdatum 2009-01-12, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      // no 'Comments to changes in course data or course analysis after publishing',
      // next round Med teknik ( Startdatum 2008-08-29, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      // no 'Comments to changes in course data or course analysis after publishing',
      // next round CINTE CMIEL ( Startdatum 2008-08-29, Svenska )
      'Examination comments',
      'Compulsory within programme',
      'Administrative course instances included in the course offering',
      'Published first time',
      'Last time changed',
      'Comments to changes in course data or course analysis after publishing'
    ]
    expectedhds.map((h4, index) => expect(allH4Headers[index]).toHaveTextContent(h4))
  })

  test('Get popover desktop and mobile buttons and check it is number', async () => {
    const allBtns = getAllByRole('button')
    expect(allBtns.length).toBe(96)
  })

  test('Get Comments to changes in course data or course analysis after publishing if it renders', async () => {
    const oneCommentAboutChanges = getByText('LKJHDFJ')
    const anotherCommentAboutChanges = getByText('kjhaew')
    expect(oneCommentAboutChanges).toBeInTheDocument()
    expect(anotherCommentAboutChanges).toBeInTheDocument()
  })

  test('Get some dates of data changes in course data or course analysis after publishing if it renders', async () => {
    const changeDates = getAllByText('9/11/2019')
    expect(changeDates.length).toBe(3)
  })

  test('Get No information inserted if no data changes in course data or course analysis after publishing if it renders', async () => {
    const changeDates = getAllByText('No information inserted')
    expect(changeDates.length).toBe(2)
  })

  test('Get Additional data about this course offering if it renders', async () => {
    const extraInfo = getAllByText('Additional data about this course offering')
    expect(extraInfo.length).toBe(8)
  })

  test('Check if aria-label is correct for Additional data about this course offering if it renders', async () => {
    const rounds = ROUNDS
    rounds.map((roundName) =>
      expect(
        screen.getByLabelText(`Additional data about this course offering: ${roundName}`)
      ).toBeInTheDocument()
    )
  })

  test('Get Edit (for course coordinator) if it renders', async () => {
    const extraInfo = getAllByText('Edit (for course coordinator)')
    expect(extraInfo.length).toBe(8)
  })

  test('Check if aria-label is correct for Edit (for course coordinator) if it renders', async () => {
    ROUNDS.map((roundName) =>
      expect(
        screen.getByLabelText(
          `Change published course analysis and course data. Course rounds: ${roundName}`
        )
      ).toBeInTheDocument()
    )
  })

  test('Get Edit (for course coordinator) if it renders', async () => {
    const extraInfo = getAllByText('Edit (for course coordinator)')
    expect(extraInfo.length).toBe(8)
  })

  test('Check links if it renders', async () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(27)
    const expectedLinks = [
      'About course SF1624',
      'Administrate About course',
      // by each round
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2019 - )',
      'Course memo: 10/09/2019',
      'Course analysis: 10/09/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'Course analysis: 04/09/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'Course analysis: 11/09/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'Course analysis: 09/10/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2009 - Spring 2010 )',
      'Course analysis: 08/10/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'Course analysis: 09/09/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'Course analysis: 03/09/2019',
      'Edit (for course coordinator)',
      'Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'Course analysis: 08/10/2019'
    ]

    links.map((l, index) => expect(l).toHaveTextContent(expectedLinks[index]))
  })

  test('Check if aria-label is correct for PDF links', async () => {
    const links = screen.getAllByRole('link')
    const editLink = 'Change published course analysis and course data. Course rounds: '
    const expectedAriaLabels = [
      null,
      null,
      // by each round
      `${editLink}CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2019 -  )',
      'PDF Course memo CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska ): 10/09/2019',
      'PDF Course analysis CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska ): 10/09/2019',
      `${editLink}CMEDT1 ( Startdatum 2018-10-29, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'PDF Course analysis CMEDT1 ( Startdatum 2018-10-29, Svenska ): 04/09/2019',
      `${editLink}CITEH1 ( Startdatum 2018-10-29, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'PDF Course analysis CITEH1 ( Startdatum 2018-10-29, Svenska ): 11/09/2019',
      `${editLink}TCOMK1 ( Start date  17/01/2017, English ) ,  CINTE1 ( Start date  17/01/2017, Swedish )`,
      'PDF Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'PDF Course analysis TCOMK1 ( Start date  17/01/2017, English ) ,  CINTE1 ( Start date  17/01/2017, Swedish ): 09/10/2019',
      `${editLink}CMETE CSAMH ( Startdatum 2010-01-11, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2009 - Spring 2010 )',
      'PDF Course analysis CMETE CSAMH ( Startdatum 2010-01-11, Svenska ): 08/10/2019',
      `${editLink}CSAMH1 ( Startdatum 2009-01-12, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'PDF Course analysis CSAMH1 ( Startdatum 2009-01-12, Svenska ): 09/09/2019',
      `${editLink}Med teknik ( Startdatum 2008-08-29, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'PDF Course analysis Med teknik ( Startdatum 2008-08-29, Svenska ): 03/09/2019',
      `${editLink}CINTE CMIEL ( Startdatum 2008-08-29, Svenska )`,
      'PDF Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'PDF Course analysis CINTE CMIEL ( Startdatum 2008-08-29, Svenska ): 08/10/2019'
    ]
    links.map((link, index) =>
      expect(link.getAttribute('aria-label')).toBe(expectedAriaLabels[index])
    )
  })

  test('Links have a correct href', async () => {
    const links = getAllByRole('link')
    const linkAddresses = [
      'http://localhost/student/kurser/kurs/SF1624?l=en',
      'http://localhost/kursinfoadmin/kurser/kurs/SF1624?l=en',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624HT2019_9?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=en',
      'http://localhost/pm-SF1624HT2019_9.pdf',
      'http://localhost/analysis-SF1624HT2019_9.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624HT2018_9?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2018_9.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624HT2018_6?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2018_6.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624VT2017_1_2?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en',
      'http://localhost/analysis-SF1624VT2017_1_2.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624VT2010_1?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20092.pdf?lang=en',
      'http://localhost/analysis-SF1624VT2010_1.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624VT2009_1?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=en',
      'http://localhost/analysis-SF1624VT2009_1.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624HT2008_5?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2008_5.pdf',
      'http://localhost/kursinfoadmin/kursutveckling/SF1624HT2008_1?l=en&serv=kutv&status=p&title=Algebra%20and%20Geometry_7.5',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2008_1.pdf'
    ]
    links.map((link, index) => expect(link.href).toStrictEqual(linkAddresses[index]))
  })

  test('check how behave memo link when no memo is added', async () => {
    const memoNotAdded = screen.getAllByText('Course memo: not added')
    expect(memoNotAdded.length).toBe(7)
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
    const responsible = getAllByText('Responsible')
    expect(responsible.length).toBe(16)
    const examiner = getAllByText('Examiners')
    expect(examiner.length).toBe(16)
    const students = getAllByText('Students')
    expect(students.length).toBe(16)
    const exams = getAllByText('Examination')
    expect(exams.length).toBe(16)
    const results = getAllByText('Result')
    expect(results.length).toBe(16)
    const changes = getAllByText('Changes of the course before this course offering')
    expect(changes.length).toBe(16)
  })

  test('Responsible names if it renders', async () => {
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
