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
    date_first_published: 'Publicerad första gången',
    date_last_change: 'Senaste ändrad',
    date_pdf_analys: 'Datum för publicerad kursanalys',
    header_course_round: 'Kursomgång',
    header_programs: 'Obligatorisk inom program',
    header_rounds: 'Kurstillfällen som ingår i kursomgång',
    header_examiners: 'Examinator',
    header_examination: 'Examination',
    header_examination_comment: 'Kommentar till examination',
    header_examination_grade: 'Resultat',
    header_responsibles: 'Kursansvarig',
    header_registrated: 'Studenter',
    header_course_changes_comment: 'Förändringar som har införts till den här kursomgången',
    header_analysis_edit_comment: 'Kommentar till gjorda ändringar',
    header_more_info: 'Mer information',
    link_syllabus: 'Kursplan',
    link_analysis: 'Kursanalys',
    link_pm: 'Kurs-PM',
    no_date_last_changed: 'ej ändrad efter publicering',
    no_course_analys: 'Kursutveckling saknas',
    popover_more: 'Mer...',
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    }
  },
  pageTitles: {
    about_course: 'Om kursen',
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
      success: 'Ny version av kursutvecklingsinformation har publicerats på kursinformationssidan',
      over_text_limit: 'Texten får bara bestå av 1 500 tecken',
      over_html_limit: 'HTML texten får bara bestå av 10 000 tecken',
      api_error: 'Det gick inte att spara texten på grund av teknisk fel. Kopiera texten och försök igen senare',
      kopps_api_down: 'Det går för närvarande inte att hämta information från KOPPS så viss information kommer att saknas'
    },
    course_short_semester: {
      1: 'VT ',
      2: 'HT '
    }
  },
  sellingTextLabels: {
    label_course_dev_info: 'Du kan här analysera kursutveckling av kursen...',
    label_max_number_letters: 'Maximalt antal tecken är 1500.',
    label_left_number_letters: 'Antal tecken kvar att använda:',
    label_en: 'Engelsk text',
    label_sv: 'Svensk text',
    changed_by: 'Senast ändrad av:',
    graph: 'Grapher för kursutveckling',
    altLabel: {
      start_link_back: 'Till kursinformationssida',
      button_cancel: 'Avbryt och gå till admin startsida'
    }
  },
  courseRoundInformation: {
    round_teacher: 'Lärare',
    round_tutoring_language: 'Undervisningsspråk'
  }
}
