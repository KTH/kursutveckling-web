module.exports = {
  shortNames: ['sv', 'se'],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%Y-%m-%d',
    language_link_lang_en: 'English',
    menu_panel_search: 'Sök',
    menu_panel_close: 'Stäng',
    menu_panel_menu: 'Meny',

    /**
     * Error messages
     */

    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    /**
     * Message keys
     */
    service_name: 'Kursens utveckling och historik web',
    title: 'Kursens utveckling och historik',
    description:
      'På denna sida publicerar kursansvariga kursdata och kursanalyser. Här kan presumtiva, nuvarande och tidigare studenter ta del av informationen till hjälp vid kursval eller för att följa upp sitt eget deltagande i kursvärderingar. Lärare, kursansvariga, examinatorer m.fl. kan använda sidan som ett stöd vid kursutveckling.',

    example_message_key: 'Här är en svensk översättning på en label',
    button_label_example: 'Klicka här för att skicka data till servern!',
    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Denna sida på svenska',

    site_name: 'Kursutvecklingsinformation',
    skip_to_main_content: 'Hoppa till huvudinnehållet',
    host_name: 'KTH',
    page_about_course: 'Om kursen',
    page_course_programme: 'Kurs- och programkatalogen',
    page_student: 'Student på KTH',

    admin_link_title: 'Administrera Om kursen',

    archiveTitles: {
      archive: 'Arkiv',
      about_course: 'Om kursen',
      sub_menu_aria_label: 'Undermeny',
      course_programme: 'Kurs- och programkatalogen',
      before_choosing_course: 'Inför kursval',
      prepare_course: 'Förbereda och gå kurs',
      course_development: 'Kursens utveckling',
      label_syllabus: 'Kursplan',
      label_syllabuses: 'Kursplaner',
      label_semester: 'Termin',
      course_short_semester: {
        1: 'VT',
        2: 'HT'
      },
      ongoing_label: 'tillsvidare',
      label_memos: 'Kurs-PM',
      label_course_offering: 'Kursomgång',
      label_memo: 'Kurs-PM',
      label_version: 'Ver',
      label_latest_version: 'senaste versionen',
      no_syllabuses: 'Denna kurs saknar godkänd kursplan.',
      no_memos: 'Denna kurs har inga publicerade kurs-PM.',
      no_analyses: 'Denna kurs har inga publicerade kursanalyser.',
      label_course_analyses: 'Kursanalyser',
      label_course_analysis: 'Kursanalys',
      analysis_in_canvas: 'Se kursanalys i Canvas.'
    }
  },
  analysisHeaders: {
    info_manually_edited: 'Kursdata har registrerats manuellt',

    close_button_label: 'Stäng',
    aria_label_info_icon: 'Mer information',

    examiners: {
      header: 'Examinator',
      popover_text: 'Examinator för kurs vid gällande kursomgång. Examinatorer administreras i Kopps.'
    },
    alterationText: {
      header: 'Förändringar som införs till nästa kursomgång'
    },
    alterationTextAdminWeb: {
      header: 'Förändringar som har införts till den här kursomgången'
    },
    examinationGrade: {
      header: 'Examinationsgrad',
      popover_text:
        'Examinationsgrad är antal förstagångsregistrerade studenter som godkänts på hela kursomgången efter första examinationstillfället efter kursomgångens slut dividerat med antal förstagångsregistrerade på kursomgången. Examinationsgrad redovisas inte för respektive delmoment i examinationen. Examinationsgrad beräknas inte heller om efter efterföljande omtentor.'
    },
    gradingDistribution: {
      header: 'Resultat på kurs',
      total: 'Totalt antal',
      popover_text:
        'Antal registrerade studenter med inrapporterat resultat på kurs, samt betygsfördelning. Omregistrerade studenter räknas ej in.'
    },
    responsibles: {
      header: 'Kursansvarig'
    },
    registeredStudents: {
      header: 'Studenter',
      popover_text: 'Antal registrerade studenter. Omregistrerade studenter räknas ej in.'
    },
    programmeCodes: { header: 'Obligatorisk inom program' },
    analysisName: {
      header: 'Kursanalysen gäller för följande kursomgångar',
      popover_text:
        'Alla kurstillfällen som ingick i kursomgången. Studenter är antagna till ett kurstillfälle. Programstudenter, betalande studenter och fristående studenter antas till olika kurstillfällen men kan utbildas i samma kursomgång. Kurstillfällen ska alltså grupperas ihop till en kursomgång. Kursomgången är ett praktiskt genomförande av en kurs. Kursomgången har en gemensam starttidpunkt, gemensam kurstakt och normalt gemensam undervisning för en studentgrupp. Schemat läggs per kursomgång, kurs-PM utformas per kursomgång och kursanalys genomförs per kursomgång.'
    },

    no_course_analysis: 'När kursanalysen är publicerad visas kursdata, kurs-PM och kursplan.',
    no_added: 'Ingen information tillagd',

    syllabusLink: { header: 'Kursplan', no_added_doc: 'Ingen kursplan tillagd' },
    analysisLink: { header: 'Kursanalys', no_added_doc: 'Ingen kursanalys tillagd' },
    memoLink: { header: 'Kurs-PM', no_added_doc: 'Inget kurs-PM tillagt' },

    courseShortSemester: {
      1: 'VT',
      2: 'HT'
    }
  },
  pageTitles: {
    about_course: 'Om kursen',
    course_dev_title: 'Kursens utveckling',
    course_info_title: 'Kursinformation',
    regulated_link: '”Riktlinje om kursvärdering och kursanalys”. ',
    info_text: {
      0: 'På denna sida kan du se hur kursen utvecklats över tid. För varje kurstillfälle visas kursdata (examination, antal registrerade studenter och resultat på kurs tillsammans med planerade förändringar till nästa kurstillfälle). ',
      1: 'Alla kursplaner och publicerade kurs-PM visas på sidan ',
      2: 'Presumtiva, nuvarande, och tidigare studenter kan ta del av informationen som hjälp vid kursval, eller för att följa upp sitt eget deltagande. Lärare, kursansvariga, examinatorer, programansvariga m.fl. kan använda sidan som ett stöd vid kursutveckling.'
    },
    label_syllabus_link: 'Kursplan',
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    },
    altLabel: {
      start_link_back: 'Till kursinformationssida',
      button_cancel: 'Avbryt och gå till admin startsida'
    }
  },
  breadCrumbs: {
    student: 'Studentwebben',
    studies: 'Studier',
    directory: 'Kurs- och programkatalogen'
  }
}
