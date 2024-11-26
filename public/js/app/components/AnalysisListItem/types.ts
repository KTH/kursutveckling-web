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
  
}



export interface KoppsCourseData {
  koppsDataLang: 'sv' | 'en'
  syllabusPeriods: SyllabusPeriods
}

export interface SyllabusPeriods extends Record<string, { endDate: string }> {}
