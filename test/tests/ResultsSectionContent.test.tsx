import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultsSectionContent from '../../public/js/app/components/AnalysisList/ResultsSectionContent'
import { isCanvasAnalysis } from '../../public/js/app/components/AnalysisList/utils'
import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from '../../public/js/app/components/AnalysisList/types'
import {
  transformedAnalysisDataFromCanvas,
  transformedAnalysisDataFromAdminWeb
} from '../mocks/transformedAnalysisData'

// Mock the isCanvasAnalysis utility
jest.mock('../../public/js/app/components/AnalysisList/utils', () => ({
  isCanvasAnalysis: jest.fn()
}))

describe('ResultsSectionContent', () => {
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

    render(<ResultsSectionContent subHeader="Results" analysis={mockCanvasAnalysis} />)

    expect(screen.getByText('Results')).toBeInTheDocument()

    expect(screen.getByText('2 (67%)')).toBeInTheDocument() // Sum of grades excluding F and FX
    expect(screen.getByText('P')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders examination grade for Admin Web analysis', () => {
    ;(isCanvasAnalysis as unknown as jest.Mock).mockReturnValue(false)

    render(<ResultsSectionContent subHeader="Results" analysis={mockAdminWebAnalysis} />)

    // Verify sub-header
    expect(screen.getByText('Results')).toBeInTheDocument()

    // Verify examination grade
    expect(screen.getByText('12%*')).toBeInTheDocument()
  })
})
