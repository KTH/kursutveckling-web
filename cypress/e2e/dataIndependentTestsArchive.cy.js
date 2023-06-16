/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />
// const parse = impor'date-fns/parse')

import parse from 'date-fns/parse'

const { isMobile } = require('../support/utils')

const courseCode = Cypress.env('COURSE_CODE')

describe('course page', () => {
  beforeEach(() => {
    cy.visit(`/${courseCode}/arkiv?l=sv`)
    cy.get('.cm-btn-success').click()
  })

  it('displays a clickable link to the course analyses', () => {
    let id = 'mainMenu'
    if (isMobile()) {
      cy.log('Mobile viewport, opening hamburger menu')
      id = 'mobileMenu'
      cy.get('button[title^="Öppna"]').click()
    }

    cy.get(`#${id} a:contains(Kursens utveckling)`).click()

    cy.location().should((location) => {
      expect(location.pathname).to.contain(`/${courseCode}`)
      expect(location.pathname).not.to.contain(`/arkiv`)
    })
  })

  it('displays a link to a web PDF course plan', () => {
    // removeAttr target is needed, because cypress cannot handle new tabs/windows
    // the addition of the download attribute is needed, because cypress cannot handle other content-types
    // than text/html
    cy.contains(`Kursplan ${courseCode}`).invoke('removeAttr', 'target').invoke('attr', 'download', '').click()
    cy.verifyDownload(courseCode, { contains: true })
    cy.verifyDownload('.pdf', { contains: true })
  })

  it('displays a link to a current course PM', () => {
    // removeAttr target is needed, because cypress cannot handle new tabs/windows
    cy.get('a[aria-label^="Ver 1"]').first().invoke('removeAttr', 'target').click()
    cy.url().should('include', `kurs-pm/${courseCode}/${courseCode}`)
    cy.get('#page-heading').should('contain.text', 'Kurs-PM')
  })

  it('displays a link to an older course PM', () => {
    // removeAttr target is needed, because cypress cannot handle new tabs/windows
    // The first child is the title, the second the current version and the third an older version
    cy.get('ul.link-list > li:nth-child(3) > a[aria-label^="Ver"]').first().click()

    cy.url().should('include', `kurs-pm/old/${courseCode}/${courseCode}`)
    cy.get('#page-heading').should('contain.text', 'Kurs-PM')
    cy.contains('Detta är inte senaste versionen av kurs-PM')
  })

  it('displays a link to a PDF course PM', () => {
    cy.fetchPdf('PDF Ver').then(({ status, headers }) => {
      expect(status).to.eq(200)
      expect(headers['x-ms-meta-pm']).to.include(`memo-${courseCode}`)
    })
  })

  it('displays a link to a PDF course analysis', () => {
    cy.fetchPdf('PDF Kursanalys').then(({ status, headers }) => {
      expect(status).to.eq(200)
      expect(headers['x-ms-meta-analysis']).to.include(`${courseCode}`)
    })
  })

  it('displays several links to course plans, course PMs, PDF course PMs and course analyses', () => {
    cy.get(`a[aria-label^="PDF Kursplan ${courseCode}"]`).should('have.length.at.least', 1)
    cy.get('a[aria-label^="Ver"]').should('have.length.at.least', 1)
    cy.get(`a[aria-label^="PDF Ver"]`).should('have.length.at.least', 1)
    cy.get('a[aria-label^="PDF Kursanalys"]').should('have.length.at.least', 1)
  })

  it('should display course PM versions in the order newest to oldest', () => {
    cy.document().then((doc) => {
      const allLinkLists = doc.querySelectorAll('ul.link-list')

      const allLinkArr = Array.prototype.map.call(allLinkLists, (list) => list.querySelectorAll('a'))

      const allPMsWithMultipleVersions = allLinkArr.filter((links) => links.length > 1)

      const allTitleArr = allPMsWithMultipleVersions.map((links) =>
        Array.prototype.map.call(links, (link) => link.innerHTML)
      )

      allTitleArr.forEach((titles) => {
        const dates = titles.map((title) => {
          const [, stringDate] = title.split('– ')
          const date = parse(stringDate, 'yyyy-MM-dd HH:mm:ss', new Date())
          return date
        })

        for (let index = 1; index < dates.length; index++) {
          chai.expect(dates[index - 1]).to.be.greaterThan(dates[index])
        }
      })
    })
  })
})
