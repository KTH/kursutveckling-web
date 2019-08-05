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
    header_main_publish_new: 'Publish new course analysis with course data',
    alt_header_main_publish_new: 'Go to the admin page to Publish new course analysis with kursdata',
    alt_header_main_edit: 'Go to the admin page to Change published course analysis and course data',
    alt_link_syllabus: 'Open a new tab to show the valid Course syllabus pdf',
    alt_link_analysis: 'Open a new tab to show the valid Course analysis pdf',
    alt_link_pm: 'Open a new tab to show the valid Course-memo pdf',
    table_headers_with_popup: {
      examiners: {header: 'Examiners', popoverText: 'The examiners of the course at the time for the course offering. Examiners are administrated in Kopps.'},
      examShortAndLongStrArr: {header: 'Examination', popoverText: 'Form of examinataion for the course offering.'},
      alterationText: {header: 'Changes of the course before this course offering', popoverText: 'Summarized changes made to the course before this particular course offering.'},
      examinationGrade: {header: 'Result', popoverText: 'Graduation rate is defined as the number of passed first registration students on the whole course divided by the number of registered student (as defined above) after the first ordinary examination after the end date of the course offering. Graduation rate is not calculated for each examination session in the course examination set. Neither is it recalculated after each following re-examination. Graduation rate is calculated based on information fetched from Ladok.'},
      responsibles: {header: 'Responsible', popoverText: 'All the course responsibles for the all the administrative course instances that are included in the course offering. Course responsibles are administrated in Kopps.'},
      registeredStudents: {header: 'Students', popoverText: 'Number of registered students are defined as the number of first registration students on all the administrative course instances that are included in the course offering. Admitted students that have not been registered shall not be counted. Neither shall registered students that have been re-registered from a previous administrative course instance counted. Number of registered students is calculated based on information fetched from Ladok.'}
    },
    extra_kopps_info: {
      commentExam: {header: 'Examination comments', popoverText: 'Examination comments for the course offering examination.'},
      programmeCodes: {header: 'Compulsory within programme', popoverText: ''},
      analysisName: {header: 'Administrative course instances included in the course offering', popoverText: 'All the administrative course instances that was included in the course offering. Students are admitted to an administrative course instance. Degree program students and non-programme students are admitted to different administrative course instances but may be educated in the same course offering. A course offering is thereby the practical realisation of the course with a common start date, common pace, common timetable etc. for all students. Several administrative course instances are grouped to one course offering'}
    },
    extra_dates_and_comments: {
      header_publishing_dates: 'Published date',
      // alt_alla: 'It is possible to upload new versions of course analysis and course memos and rewrite changes to this course offering. Look at comments about the purpose of the new versions in this field',
      publishedDate: 'Published first time',
      changedAfterPublishedDate: 'Last time changed',
      commentChange: 'Comments to changes in course data or course analysis after publishing',
      no_date_last_changed: 'No changes since first published.'
    },
    header_more_info: 'More information',
    link_syllabus: 'Course plan',
    link_analysis: 'Course analys',
    link_pm: 'Course memo',
    no_course_analys: 'Course analyses with course data is not available yet.',
    // no_pdf_document: 'not found',
    popover_more_info: 'More information',
    course_short_semester: {
      1: 'Spring ',
      2: 'Autumn '
    }
  },
  pageTitles: {
    about_course: 'About course',
    alt_label_syllabus_link: 'Show a course plan which is valid for this period',
    course_dev_title: 'Course development and history',
    course_dev_title_alt: 'To Course development and history',
    course_info_title: 'Course information',
    course_info_title_alt: 'To Course information view',
    course_admin_title: 'Administrate',
    course_admin_title_alt: 'Administrate "About course"',
    header_syllabuses: 'All course syllabuses',
    info_text: 'On this page, current and prospective students can access course data and course analyzes for previous rounds of the course to help to choose a course.',
    info_admin_text: 'Course responsibles can get an overwiew over course development and are responsible to publish information about course development with course data',
    label_syllabus_link: 'Course syllabus ',
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
