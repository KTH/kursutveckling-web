/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StudentViewCourseDev from '../../public/js/app/pages/StudentViewCourseDev'
import mockAdminStore from '../mocks/mockAdminStore'
import { WebContextProvider } from '../../public/js/app/context/WebContext'

const { getAllByRole, getAllByText, getByText } = screen
const userLang = 'en'
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

describe('User language: English. Component <StudentViewCourseDev>', () => {
  beforeEach(() => {
    render(<CourseDevelopment />)
  })

  test('renders and check all headers on the place', () => {
    const allH1Headers = getAllByRole('heading', { level: 1 })
    expect(allH1Headers.length).toBe(1)
    expect(allH1Headers[0]).toHaveTextContent('Course development')
    const subHeader = getByText('SF1624 Algebra and Geometry 7.5 credits')
    expect(subHeader).toBeInTheDocument()
  })

  test('renders h4 for all years', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(10)
  })

  test('renders h3 for all analysis name headers', () => {
    const allH4Headers = getAllByRole('heading', { level: 4 })
    expect(allH4Headers.length).toBe(10)
  })

  test('renders popover buttons ', async () => {
    const allBtns = getAllByRole('button')
    expect(allBtns.length).toBe(20)
  })

  test('Get No information inserted if no data changes in course data or course analysis after publishing if it renders', async () => {
    const changeDates = getAllByText('No information inserted')
    expect(changeDates.length).toBe(16)
  })

  test('Check links if it renders', async () => {
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(21)
    const expectedLinks = [
      'About course SF1624',
      'Administer About course',
      'Archive',
      // by each round
      'Course syllabus SF1624 ( Autumn 2019 - )',
      'Course syllabus SF1624 ( Autumn 2019 - )',
      'Course syllabus SF1624 ( Autumn 2019 - )',
      'Course analysis SF1624: 10 Sept 2019',
      'Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'Course analysis SF1624: 4 Sept 2019',
      'Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'Course analysis SF1624: 11 Sept 2019',
      'Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )',
      'Course analysis SF1624: 9 Oct 2019',
      'Course syllabus SF1624 ( Autumn 2009 - Spring 2010 )',
      'Course analysis SF1624: 8 Oct 2019',
      'Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'Course analysis SF1624: 9 Sept 2019',
      'Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'Course analysis SF1624: 3 Sept 2019',
      'Course syllabus SF1624 ( Autumn 2008 - Spring 2009 )',
      'Course analysis SF1624: 8 Oct 2019'
    ]

    links.map((l, index) => expect(l).toHaveTextContent(expectedLinks[index]))
  })

  test('Links have a correct href', async () => {
    const links = getAllByRole('link')
    expect(links.length).toBe(21)
    const linkAddresses = [
      'http://localhost/student/kurser/kurs/SF1624?l=en',
      'http://localhost/kursinfoadmin/kurser/kurs/SF1624?l=en',
      'http://localhost/kursutveckling/SF1624/arkiv?l=en',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=en',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=en',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2019_9.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2018_9.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2018_6.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en',
      'http://localhost/analysis-SF1624VT2017_1_2.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20092.pdf?lang=en',
      'http://localhost/analysis-SF1624VT2010_1.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=en',
      'http://localhost/analysis-SF1624VT2009_1.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2008_5.pdf',
      'http://localhost/student/kurser/kurs/kursplan/SF1624-20082.pdf?lang=en',
      'http://localhost/analysis-SF1624HT2008_1.pdf'
    ]
    links.map((link, index) => expect(link.href).toStrictEqual(linkAddresses[index]))
  })

  test('check how behave memo link when no memo is added', async () => {
    const memoNotAdded = screen.getAllByText('No course memo added')
    expect(memoNotAdded.length).toBe(11)
  })

  test('Changes of the course before this course offering if it renders', async () => {
    const changes = getByText('fads')
    expect(changes).toBeInTheDocument()
  })

  test('Get table headers (mobile and desktop)', async () => {
    const responsible = getAllByText('Coordinator')
    expect(responsible.length).toBe(10)
    const examiner = getAllByText('Examiners')
    expect(examiner.length).toBe(10)
    const students = getAllByText('Students')
    expect(students.length).toBe(10)
    const examinationGrade = getAllByText('Examination grade')
    expect(examinationGrade.length).toBe(8)
    const gradingDistribution = getAllByText('Results on course')
    expect(gradingDistribution.length).toBe(2)
    const changes = getAllByText('Changes introduced for this course offering')
    expect(changes.length).toBe(8)
    const changesNext = getAllByText('Changes planned for the next course offering')
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
    expect(links[3]).toHaveTextContent('Course syllabus SF1624 ( Autumn 2019 - )')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/SF1624-20192.pdf?lang=en')

    expect(links[6]).toHaveTextContent('Course analysis SF1624: 10 Sept 2019')
    expect(links[6].href).toStrictEqual('http://localhost/analysis-SF1624HT2019_9.pdf')

    expect(links[7]).toHaveTextContent('Course syllabus SF1624 ( Autumn 2010 - Spring 2019 )')
    expect(links[7].href).toStrictEqual('http://localhost/student/kurser/kurs/kursplan/SF1624-20102.pdf?lang=en')
  })
})
