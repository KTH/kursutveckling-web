module.exports = {
  shortNames: [ 'en' ],
  longNameSe: 'Engelska',
  longNameEn: 'English',
  messages: {
    /**
     * General stuff
     */
    date_format_short: '%d-%b-%Y',

    /**
     * Error messages
     */

    error_not_found: 'Sorry, we can\'t find your requested page',
    error_generic: 'Something went wrong on the server, please try again later.',

    /**
     * Message keys
     */
    service_name: 'course development web',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'Course development information in English',

    site_name: 'Course development information',
    host_name: 'KTH',
    page_student: 'STUDENT AT KTH COURSE DEVELOPMENT INFORMATION',
    page_teacher: 'TEACHER AT KTH COURSE DEVELOPMENT INFORMATION',
    page_course_programme: 'COURSE AND PROGRAMME DIRECTORY'
  },
  tableHeaders: {
    header_course_round: 'Course round',
    header_main_edit: 'Change',
    header_main_publish_new: 'Publish new course analysis with kursdata',
    alt_header_main_publish_new: 'Go to the admin page to Publicera ny kursanalys och kursdata',
    alt_header_main_edit: 'Go to the admin page to edit this course analysis with course data',
    alt_link_syllabus: 'Open a new tab to show the valid Course plans pdf',
    alt_link_analysis: 'Open a new tab to show the valid Course analys pdf',
    alt_link_pm: 'Open a new tab to show the valid Course-PM pdf',
    table_headers_with_popup: {
      examiners: {header: 'Examinator', popoverText: ''},
      examShortAndLongStrArr: {header: 'Examination', popoverText: ''},
      alterationText: {header: 'Changes introduced ...', popoverText: ''},
      examinationGrade: {header: 'Result', popoverText: 'Resultat i % av aktiva (totalt) vid första ex-tillfället Examinationsgrad'},
      responsibles: {header: 'Course responsible', popoverText: ''},
      registeredStudents: {header: 'Students', popoverText: 'Antal reg. studenter'},
      popover_more: 'More...'
    },
    extra_kopps_info: {
      commentExam: {header: 'Comments to examination', popoverText: ''},
      programmeCodes: {header: 'Obligatory for a list of programs', popoverText: ''},
      analysisName: {header: 'Course rounds which are included in...', popoverText: ''}
    },
    extra_dates_and_comments: {
      header_publishing_dates: 'Published date',
      publishedDate: 'Published first time',
      changedAfterPublishedDate: 'Last changed',
      commentChange: 'Comments to done changes',
      no_date_last_changed: 'no changes since first publishing'
    },
    header_more_info: 'More information',
    link_syllabus: 'Course plan',
    link_analysis: 'Course analys',
    link_pm: 'Course-PM',
    no_course_analys: 'Course analys has not been filled in yet',
    popover_more_info: 'More information',
    course_short_semester: {
      1: 'Spring ',
      2: 'Autumn '
    }
  },
  pageTitles: {
    about_course: 'About course',
    alt_label_syllabus_link: 'Show a course plan which is valid for this period',
    alt_link_to_course_dev: 'To admin page to publish new course data and course analys.',
    course_dev_title: 'Course progress and history',
    course_info_title: 'Course information',
    course_admin_title: 'Administrate',
    header_syllabuses: 'All course syllabuses',
    info_text: 'På denna ... ....',
    info_admin_text: 'Ansvariga .......',
    label_syllabus_link: 'Course syllabus',
    link_to_course_dev: ' publish course data and course analys.',
    no_course_syllabus: 'No course syllabuses are found',
    alertMessages: {
      kopps_api_down: 'Failed to get data from KOPPS for now therefore some information is missing'
    },
    course_short_semester: {
      1: 'Spring ',
      2: 'Autumn '
    },
    altLabel: {
      start_link_back: 'To course information page',
      button_cancel: 'Cancel and go back to admin start page'
    }
  }
}
