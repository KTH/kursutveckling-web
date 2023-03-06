const mockCourseAnalysis = (semester = '20172', applicationCodes = '1') => ({
  _id: 'EI1220HT2017_1',
  courseCode: 'EI1220',
  registeredStudentsFromLadok: false,
  examinationGradeFromLadok: false,
  changedAfterPublishedDate: '',
  syllabusStartTerm: '20142',
  ugKeys: ['EI1220.examiner', 'EI1220.20172.1.courseresponsible'],
  pmFileName: 'pm-EI1220HT2017_1.pdf',
  analysisFileName: 'analysis-EI1220HT2017_1.pdf', // prev file from api
  applicationCodes,
  semester,
  changedBy: 'sajonsson',
  changedDate: 'Thu Sep 05 2019 10:50:02 GMT+0000 (UTC)',
  pdfPMDate: '2019-09-05',
  pdfAnalysisDate: '2019-09-05',
  publishedDate: '2019-09-05',
  isPublished: true,
  commentChange: '',
  commentExam:
    'Examinator beslutar, baserat på rekommendation från KTH:s samordnare för funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.',
  alterationText: '',
  examinationGrade: '-1',
  registeredStudents: '-1',
  examinationRounds: [
    'KONE;Kontrollskrivning E;3,5;hp;Betygsskala;P, F              \n                         ',
    'KONM;Kontrollskrivning M;4,0;hp;Betygsskala;P, F              \n                         ',
    'TEN1;Tentamina;3,0;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
  ],
  responsibles: 'SA Jonsson',
  examiners: 'SA Jonsson',
  programmeCodes: 'CELTE',
  analysisName: `Fake name ${semester}-${applicationCodes} ( Startdatum 20xx-09-18, Svenska )`,
  __v: 0
})
export default mockCourseAnalysis
