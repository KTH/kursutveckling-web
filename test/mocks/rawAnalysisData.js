const mockRawAnalysisDataFromCanvas = [
  {
    _id: '6711178a1353f5e3af556077',
    id: '39b5624f-7f0f-11ef-90b2-54c43689408b',
    alterationText: 'Hej hej!!!',
    analysisName: 'doktorand 2024-51460 ( Start date 28 Oct 2024, English )',
    applicationCodes: '51460',
    courseCode: 'AI1527',
    endDate: '2025-01-13',
    examinationRounds: [
      'LAB1;Laboratory;1.0;credits;Grading scale;P, F',
      'LAB2;Laboratory;1.0;credits;Grading scale;P, F',
      'LAB3;Laboratory;1.0;credits;Grading scale;P, F',
      'PRO1;Project;4.5;credits;Grading scale;A, B, C, D, E, FX, F'
    ],
    examiners: 'Test Person Testovich Von Test',
    gradingDistribution: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      FX: 0,
      F: 0
    },
    ladokUIDs: ['39b5624f-7f0f-11ef-90b2-54c43689408b'],
    programmeCodes: '',
    registeredStudents: 1,
    responsibles: 'Test Person Testovich',
    semester: '20242',
    startDate: '2024-10-28',
    analysisType: 'canvas'
  },
  {
    _id: '673ae58e7d5093b55e7dc88a',
    id: '76f1fd19-dada-11ee-9343-2afccf5d48dc',
    alterationText: 'Test alteration text',
    courseCode: 'LD1008',
    analysisName: 'HT 2023-10189 (Startdatum 2023-10-28, Svenska)',
    programmeCodes: '1234, 5678, 8910',
    examiners: 'A, B, C',
    responsibles: 'X, Y, Z',
    examinationRounds: ['LEXA;Löpande examination;4.0;credits;Grading scale;P, F'],
    registeredStudents: 40,
    gradingDistribution: {
      P: 0,
      F: 0
    },
    startDate: '2023-10-28',
    endDate: '2024-01-13',
    semester: '20232',
    ladokUIDs: ['76f1fd19-dada-11ee-9343-2afccf5d48dc'],
    applicationCodes: '10189',
    analysisType: 'canvas'
  }
]

const mockRawAnalysisDataFromAdminWeb = [
  {
    _id: 'SF1624HT2008_5',
    courseCode: 'SF1624',
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '',
    syllabusStartTerm: '20082',
    ugKeys: ['SF1624.examiner', 'SF1624.20082.5.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624HT2008_5.pdf',
    applicationCodes: '5',
    semester: '20082',
    changedBy: 'krifa',
    changedDate: 'Tue Sep 03 2019 13:15:58 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-09-03',
    publishedDate: '2019-09-03',
    isPublished: true,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: 'fads',
    examinationGrade: '12',
    registeredStudents: '12',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Testare Person Testovna',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'CMEDT',
    analysisName: 'Med teknik ( Startdatum 2008-08-29, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624HT2018_9',
    courseCode: 'SF1624',
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '2019-09-11',
    syllabusStartTerm: '20102',
    ugKeys: ['SF1624.examiner', 'SF1624.20182.9.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624HT2018_9.pdf',
    applicationCodes: '9',
    semester: '20182',
    changedBy: 'asahu',
    changedDate: 'Wed Sep 11 2019 08:23:45 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-09-04',
    publishedDate: '2019-09-04',
    isPublished: true,
    commentChange: 'kjhaew',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: '',
    examinationGrade: '20',
    registeredStudents: '20',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Test person name and surname',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'CMEDT',
    analysisName: 'CMEDT1 ( Startdatum 2018-10-29, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624VT2009_1',
    courseCode: 'SF1624',
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '',
    syllabusStartTerm: '20082',
    ugKeys: ['SF1624.examiner', 'SF1624.20091.1.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624VT2009_1.pdf',
    applicationCodes: '1',
    semester: '20091',
    changedBy: 'ricf',
    changedDate: 'Mon Sep 09 2019 15:56:09 GMT+0200 (Central European Summer Time)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-09-09',
    publishedDate: '2019-09-09',
    isPublished: true,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: '',
    examinationGrade: '1',
    registeredStudents: '1',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Katarina Tillman',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: '',
    analysisName: 'CSAMH1 ( Startdatum 2009-01-12, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624HT2019_9',
    courseCode: 'SF1624',
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '2019-11-12',
    syllabusStartTerm: '20192',
    ugKeys: ['SF1624.examiner', 'SF1624.20192.9.courseresponsible'],
    pmFileName: 'pm-SF1624HT2019_9.pdf',
    analysisFileName: 'analysis-SF1624HT2019_9.pdf',
    applicationCodes: '9',
    semester: '20192',
    changedBy: 'ricf',
    changedDate: 'Tue Nov 12 2019 12:56:52 GMT+0000 (UTC)',
    pdfPMDate: '2019-09-10',
    pdfAnalysisDate: '2019-09-10',
    publishedDate: '2019-09-10',
    isPublished: true,
    commentChange: 'aaa',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell anpassad ' +
      'examination för studenter med dokumenterad, varaktig ' +
      'funktionsnedsättning. <br><br>Examinator får medge annan ' +
      'examinationsform vid omexamination av enstaka ' +
      'studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s ' +
      'samordnare f&#246;r funktionsneds&#228;ttning (Funka), om ' +
      'eventuell anpassad examination f&#246;r studenter med ' +
      'dokumenterad, varaktig funktionsneds&#228;ttning.&#160;</p>',
    alterationText: '',
    examinationGrade: '111',
    registeredStudents: '111',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Testovich3 Person3',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'CMATD, CSAMH, CTKEM',
    analysisName: 'CMATD1 m.fl. ( Startdatum 2019-10-28, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624HT2018_7',
    courseCode: 'SF1624',
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '',
    syllabusStartTerm: '20102',
    ugKeys: ['SF1624.examiner', 'SF1624.20182.7.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624HT2018_7.pdf',
    applicationCodes: '7',
    semester: '20182',
    changedBy: 'krifa',
    changedDate: 'Tue Sep 10 2019 07:29:02 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-09-10',
    publishedDate: '',
    isPublished: false,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: 'asdf',
    examinationGrade: '81',
    registeredStudents: '210',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: '',
    examiners: '',
    programmeCodes: 'CBIOT, CMAST',
    analysisName: 'CBIOT2 m.fl. ( Startdatum 2018-08-27, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624HT2018_6',
    courseCode: 'SF1624',
    examinationGradeLadok: 13.3,
    registeredStudentsLadok: 30,
    registeredStudentsFromLadok: true,
    examinationGradeFromLadok: true,
    changedAfterPublishedDate: '2019-09-11',
    syllabusStartTerm: '20102',
    ugKeys: ['SF1624.examiner', 'SF1624.20182.6.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624HT2018_6.pdf',
    applicationCodes: '6',
    semester: '20182',
    changedBy: 'ricf',
    changedDate: 'Wed Sep 11 2019 08:22:45 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-09-11',
    publishedDate: '2019-09-11',
    isPublished: true,
    commentChange: 'LKJHDFJ',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: '',
    examinationGrade: '13.3',
    registeredStudents: '30',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Test Person Testovich',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'CITEH',
    analysisName: 'CITEH1 ( Startdatum 2018-10-29, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624HT2008_1',
    courseCode: 'SF1624',
    examinationGradeLadok: 0,
    registeredStudentsLadok: -1,
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: true,
    changedAfterPublishedDate: '2019-10-08',
    syllabusStartTerm: '20082',
    ugKeys: ['SF1624.examiner', 'SF1624.20082.1.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624HT2008_1.pdf',
    applicationCodes: '1',
    semester: '20082',
    changedBy: 'elenara',
    changedDate: 'Tue Oct 08 2019 14:02:46 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-10-08',
    publishedDate: '2019-10-08',
    isPublished: true,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: '',
    examinationGrade: '0',
    registeredStudents: '6',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Queue Queue',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'CMIEL, CINTE',
    analysisName: 'CINTE CMIEL ( Startdatum 2008-08-29, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624VT2010_1',
    courseCode: 'SF1624',
    examinationGradeLadok: 0,
    registeredStudentsLadok: -1,
    registeredStudentsFromLadok: false,
    examinationGradeFromLadok: true,
    changedAfterPublishedDate: '',
    syllabusStartTerm: '20092',
    ugKeys: ['SF1624.examiner', 'SF1624.20101.1.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624VT2010_1.pdf',
    applicationCodes: '1',
    semester: '20101',
    changedBy: 'elenara',
    changedDate: 'Tue Oct 08 2019 15:09:04 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-10-08',
    publishedDate: '2019-10-08',
    isPublished: true,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell ' +
      'anpassad examination för studenter med dokumenterad, ' +
      'varaktig funktionsnedsättning. <br><br>Examinator får ' +
      'medge annan examinationsform vid omexamination av enstaka ' +
      'studenter.',
    alterationText: '',
    examinationGrade: '0',
    registeredStudents: '6',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Raki',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'CMETE, CSAMH',
    analysisName: 'CMETE CSAMH ( Startdatum 2010-01-11, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624HT2019_5_6',
    courseCode: 'SF1624',
    endDateLadok: '2020-01-14',
    endDateFromLadok: false,
    examinationGradeLadok: 0,
    registeredStudentsLadok: 0,
    registeredStudentsFromLadok: true,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '',
    syllabusStartTerm: '20192',
    ugKeys: ['SF1624.examiner', 'SF1624.20192.6.courseresponsible', 'SF1624.20192.5.courseresponsible'],
    pmFileName: '',
    analysisFileName: '',
    applicationCodes: '5,6',
    semester: '20192',
    changedBy: 'ricf',
    changedDate: 'Wed Oct 09 2019 06:52:48 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '',
    publishedDate: '',
    isPublished: false,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell anpassad ' +
      'examination för studenter med dokumenterad, varaktig ' +
      'funktionsnedsättning. <br><br>Examinator får medge annan ' +
      'examinationsform vid omexamination av enstaka ' +
      'studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s ' +
      'samordnare f&#246;r funktionsneds&#228;ttning (Funka), om ' +
      'eventuell anpassad examination f&#246;r studenter med ' +
      'dokumenterad, varaktig funktionsneds&#228;ttning.&#160;</p>',
    alterationText: '',
    endDate: '2019-10-09',
    examinationGrade: '0',
    registeredStudents: '0',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: '',
    examiners: '',
    programmeCodes: 'CINTE, CITEH',
    analysisName: 'CINTE1 ( Startdatum 2019-10-28, Svenska ) , ' + ' CITEH1 ( Startdatum 2019-10-28, Svenska )',
    __v: 0
  },
  {
    _id: 'SF1624VT2017_1_2',
    courseCode: 'SF1624',
    endDateLadok: '2017-03-18',
    endDateFromLadok: false,
    examinationGradeLadok: 41.4,
    registeredStudentsLadok: 111,
    registeredStudentsFromLadok: true,
    examinationGradeFromLadok: false,
    changedAfterPublishedDate: '2019-10-09',
    syllabusStartTerm: '20102',
    ugKeys: ['SF1624.examiner', 'SF1624.20171.2.courseresponsible', 'SF1624.20171.1.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624VT2017_1_2.pdf',
    applicationCodes: '1,2',
    semester: '20171',
    changedBy: 'krifa',
    changedDate: 'Wed Oct 09 2019 11:02:09 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-10-09',
    publishedDate: '2019-10-09',
    isPublished: true,
    commentChange: 'Ändrade siffror',
    commentExam:
      'Based on recommendation from KTH’s coordinator for disabilities, ' +
      'the examiner will decide how to adapt an examination for ' +
      'students with documented disability. <br><br>The examiner may ' +
      'apply another examination format when re-examining individual ' +
      'students.',
    alterationText: 'Förändringar',
    endDate: '',
    examinationGrade: '40',
    registeredStudents: '111',
    examinationRounds: [
      'TEN1;Examination;7.5;credits;Grading scale;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'Somebody Responsible',
    examiners: 'Test Person Testovich, Test2 Person2 Testovich2',
    programmeCodes: 'TCOMK',
    analysisName: 'TCOMK1 ( Start date  17/01/2017, English ) , ' + ' CINTE1 ( Start date  17/01/2017, Swedish )',
    __v: 0
  },
  {
    _id: 'SF1624HT2019_8',
    courseCode: 'SF1624',
    ladokUIDs: ['asdoIsk1-zzzzz-zzzz-zzz'],
    endDateLadok: '2020-01-14',
    endDateFromLadok: true,
    examinationGradeLadok: 0,
    registeredStudentsLadok: 172,
    registeredStudentsFromLadok: true,
    examinationGradeFromLadok: true,
    changedAfterPublishedDate: '',
    syllabusStartTerm: '20192',
    ugKeys: ['SF1624.examiner', 'SF1624.20192.8.courseresponsible'],
    pmFileName: '',
    analysisFileName: 'analysis-SF1624HT2019_8.pdf',
    applicationCodes: '8',
    semester: '20192',
    changedBy: 'ricf',
    changedDate: 'Tue Nov 12 2019 12:56:15 GMT+0000 (UTC)',
    pdfPMDate: '',
    pdfAnalysisDate: '2019-11-12',
    publishedDate: '',
    isPublished: false,
    commentChange: '',
    commentExam:
      'Examinator beslutar, baserat på rekommendation från KTH:s ' +
      'samordnare för funktionsnedsättning, om eventuell anpassad ' +
      'examination för studenter med dokumenterad, varaktig ' +
      'funktionsnedsättning. <br><br>Examinator får medge annan ' +
      'examinationsform vid omexamination av enstaka ' +
      'studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s ' +
      'samordnare f&#246;r funktionsneds&#228;ttning (Funka), om ' +
      'eventuell anpassad examination f&#246;r studenter med ' +
      'dokumenterad, varaktig funktionsneds&#228;ttning.&#160;</p>',
    alterationText: '',
    endDate: '2020-01-14',
    examinationGrade: '0',
    registeredStudents: '172',
    examinationRounds: [
      'TEN1;Tentamen;7,5;hp;Betygsskala;A, B, C, D, E, FX, F              \n                         '
    ],
    responsibles: 'J P',
    examiners: 'K T, J P',
    programmeCodes: 'COPEN, CMETE',
    analysisName: 'CMETE1 m.fl. ( Startdatum 2019-10-28, Svenska )',
    __v: 0
  }
]

module.exports = { mockRawAnalysisDataFromCanvas, mockRawAnalysisDataFromAdminWeb }
