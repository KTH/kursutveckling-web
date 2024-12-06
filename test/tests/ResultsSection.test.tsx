import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultsSection from '../../public/js/app/components/AnalysisList/ResultsSection'
import { isCanvasAnalysis } from '../../public/js/app/components/AnalysisList/utils'
import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from '../../public/js/app/components/AnalysisList/types'
import {
  transformedAnalysisDataFromCanvas,
  transformedAnalysisDataFromAdminWeb
} from '../mocks/transformedAnalysisData'
import { WebContextProvider } from '../../public/js/app/context/WebContext'
import mockAdminStore from '../mocks/mockAdminStore'

// Mock the isCanvasAnalysis utility
jest.mock('../../public/js/app/components/AnalysisList/utils', () => ({
  isCanvasAnalysis: jest.fn()
}))

const contextSV = mockAdminStore('sv')
const contextEN = mockAdminStore('en')

describe('ResultsSection', () => {
  // Get the first mocked canvas analysis
  const mockCanvasAnalysis =
    (Object.values(transformedAnalysisDataFromCanvas).find(
      (arr) => Array.isArray(arr) && arr.length > 0
    )?.[0] as unknown as RoundAnalysisCanvas) || null

  // Get the first mocked admin web analysis
  const mockAdminWebAnalysis =
    (Object.values(transformedAnalysisDataFromAdminWeb).find(
      (arr) => Array.isArray(arr) && arr.length > 0
    )?.[0] as unknown as RoundAnalysisAdminWeb) || null

  it('renders grading distribution for Canvas analysis', () => {
    ;(isCanvasAnalysis as unknown as jest.Mock).mockReturnValue(true)

    render(
      <WebContextProvider configIn={contextSV}>
        <ResultsSection analysis={mockCanvasAnalysis} />
      </WebContextProvider>
    )

    expect(screen.getByText('Resultat på kurs')).toBeInTheDocument()

    expect(screen.getByText('3')).toBeInTheDocument() // Sum of grades excluding F and FX
    expect(screen.getByText('P')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders examination grade for Admin Web analysis', () => {
    ;(isCanvasAnalysis as unknown as jest.Mock).mockReturnValue(false)

    render(
      <WebContextProvider configIn={contextEN}>
        <ResultsSection analysis={mockAdminWebAnalysis} />
      </WebContextProvider>
    )

    // Verify sub-header
    expect(screen.getByText('Examination grade')).toBeInTheDocument()

    // Verify examination grade
    expect(screen.getByText('12%*')).toBeInTheDocument()
  })
})
