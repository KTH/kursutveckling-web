import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from "./types"

export const isCanvasAnalysis = (analysis: RoundAnalysisCanvas | RoundAnalysisAdminWeb): analysis is RoundAnalysisCanvas => {
  return (analysis as RoundAnalysisCanvas).analysisType === 'canvas'
}
