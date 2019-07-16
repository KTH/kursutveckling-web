module.exports = {
  shortNames: [ 'sv', 'se' ],
  longNameSe: 'Svenska',
  longNameEn: 'Swedish',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%Y-%m-%d',

    /**
     * Error messages
     */

    error_not_found: 'Tyvärr kunde vi inte hitta sidan du söker',
    error_generic: 'Något gick fel på servern, var god försök igen senare',

    /**
     * Message keys
     */
    service_name: 'Kursutveckling-web',

    example_message_key: 'Här är en svensk översättning på en label',

    button_label_example: 'Klicka här för att skicka data till servern!',

    field_text_example: 'Data att skicka till API',

    field_label_get_example: 'Min datamodell(Svar från api anrop GET): ',
    field_label_post_example: 'Min datamodell(Svar från api anrop POST): ',

    lang_block_id: '1.272446',
    locale_text: 'Kursutvecklingsinformation på svenska',

    site_name: 'Kursutvecklingsinformation',
    host_name: 'KTH',
    page_student: 'STUDENT PÅ KURSUTVECKLING',
    page_teacher: 'LÄRARE PÅ KURSUTVECKLING',
    page_course_programme: 'KURS- OCH PROGRAMKATALOGEN'
  },
  tableHeaders: {
    header_main_edit: 'Ändra',
    header_main_publish_new: 'Publicera ny kursanalys och kursdata',
    header_course_round: 'Kursomgång',
    alt_header_main_publish_new: 'Gå till adminsida för att Publicera ny kursanalys och kursdata',
    alt_header_main_edit: 'Gå till adminsida för att andra den kursanalysen och kursdata edit this course analysis with course data',
    alt_link_syllabus: 'Till gällande Kursplan',
    alt_link_analysis: 'Till gällande Kursanalys',
    alt_link_pm: 'Till gällande Kurs-PM',
    table_headers_with_popup: {
      examiners: {header: 'Examinator', popoverText: ''},
      examShortAndLongStrArr: {header: 'Examination', popoverText: ''},
      alterationText: {header: 'Förändringar som har införts till den här kursomgången', popoverText: ''},
      examinationGrade: {header: 'Resultat', popoverText: 'Resultat i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'},
      responsibles: {header: 'Kursansvarig', popoverText: ''},
      registeredStudents: {header: 'Studenter', popoverText: 'Antal reg. studenter'},
      popover_more: 'Mer...'
    },
    extra_kopps_info: {
      commentExam: {header: 'Kommentar till examination', popoverText: ''},
      programmeCodes: {header: 'Obligatorisk inom program', popoverText: ''},
      analysisName: {header: 'Kurstillfällen som ingår i kursomgång', popoverText: ''}
    },
    extra_dates_and_comments: {
      header_publishing_dates: 'Datum för publicering',
      publishedDate: 'Publicerad första gången',
      changedAfterPublishedDate: 'Senaste ändrad',
      commentChange: 'Kommentar till gjorda ändringar',
      no_date_last_changed: 'ej ändrad efter publicering'
    },
    header_more_info: 'Mer information',
    link_syllabus: 'Kursplan',
    link_analysis: 'Kursanalys',
    link_pm: 'Kurs-PM',
    no_course_analys: 'Kursutveckling saknas',
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    }
  },
  pageTitles: {
    about_course: 'Om kursen',
    alt_label_syllabus_link: 'Visa den kursplans pdf:en som gäller för den perioden',
    alt_link_to_course_dev: 'Gå till adminsida för att Publicera ny kursanalys och kursdata',
    course_dev_title: 'Kursens utveckling och historik',
    course_dev_title_alt: 'Till Kursens utveckling och historik vy',
    course_info_title: 'Kursinformation',
    course_info_title_alt: 'Till Kursinformation vy',
    course_admin_title: 'Administrera',
    header_syllabuses: 'Samtliga kursplaner',
    info_text: 'På denna sida kan nuvarande och presumtiva studenter ta del av kursdata och kursanalyser för tidigare kursomgångar för kursen för att hjälpa till vid kursval.',
    info_admin_text: 'Ansvariga för kursen kan få en överblick över kursens utveckling och ansvarar för att',
    label_syllabus_link: 'Kursplan',
    link_to_course_dev: ' publicera kursdata och kursanalys.',
    no_course_syllabus: 'Inga kursplaner är upphittade',
    alertMessages: {
      kopps_api_down: 'Det går för närvarande inte att hämta information från KOPPS så viss information kommer att saknas'
    },
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    },
    altLabel: {
      start_link_back: 'Till kursinformationssida',
      button_cancel: 'Avbryt och gå till admin startsida'
    }
  }
}
