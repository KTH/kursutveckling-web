export interface Analysis {
  alterationText: string
  courseCode: string
  analysisName: string
  programmeCodes: string
  examiners: string
  responsibles: string
  registeredStudents: number
  totalReportedResults: number
  gradingDistribution: Record<string, number>
  semester: string
  applicationCodes: string
}

export interface KoppsCourseData {
  koppsDataLang: 'sv' | 'en'
  syllabusPeriods: SyllabusPeriods
}

export interface SyllabusPeriods extends Record<string, { endDate: string }> {}
