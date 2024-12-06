interface BaseCourseMemo {
  courseCode: string
  applicationCodes: string[]
  semester: string
  isPdf: boolean
  lastChangeDate: string
}

export interface CourseMemoWeb extends BaseCourseMemo {
  memoEndPoint: string
  memoCommonLangAbbr: 'sv' | 'en'
  memoName: string
  version: number
}

export interface CourseMemoPdf extends BaseCourseMemo {
  courseMemoFileName: string
  previousFileList: string[]
}
