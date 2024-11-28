export interface RoundAnalysis {
  alterationText: string
  courseCode: string
  analysisName: string
  programmeCodes: string
  examiners: string
  responsibles: string
  registeredStudents: number
  semester: string
  applicationCodes: string
}

export interface RoundAnalysisCanvas extends RoundAnalysis {
  totalReportedResults: number
  gradingDistribution: Record<string, number>
  analysisType: 'canvas'
}

export interface RoundAnalysisAdminWeb extends RoundAnalysis {
  examinationGrade: string,
}

