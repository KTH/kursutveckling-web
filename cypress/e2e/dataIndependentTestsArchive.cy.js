/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

const courseCode = 'SF1624'

describe('course page', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.visit(`/${courseCode}/arkiv?l=sv`)
    cy.get('.cm-btn-success').click()
  })

  it('displays a clickable link to the course analyses', () => {
    cy.get('#mainMenu a:contains(Kursens utveckling)').click()

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
    // The first child is the title, the second the current version and the third an older
    cy.get('ul.link-list > li:nth-child(3)').first().invoke('removeAttr', 'target').click()

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
})
