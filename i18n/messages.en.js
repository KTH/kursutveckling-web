module.exports = {
  shortNames: ['en'],
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

    error_not_found: "Sorry, we can't find your requested page",
    error_generic: 'Something went wrong on the server, please try again later.',

    /**
     * Message keys
     */
    service_name: 'Course development and history web',
    title: 'Course development and history',
    description:
      'On this page course analysis and course data are published by course coordinators. Prospective, current and previous students can use the information for selecting courses or follow up on previous course evaluations. Teachers, course coordinators, examiners etc. can use the page as a tool for course development.',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'This page in English',

    site_name: 'Course development information',
    skip_to_main_content: 'Skip to main content',
    host_name: 'KTH',
    page_about_course: 'About course',
    page_course_programme: 'Course and programme directory',
    page_student: 'Student at KTH',

    archiveTitles: {
      archive: 'Archive',
      about_course: 'About course',
      sub_menu_aria_label: 'Sub menu',
      course_programme: 'Course and programme directory',
      before_choosing_course: 'Before course selection',
      prepare_course: 'Prepare and take course',
      course_development: 'Course development',
      administration: 'Administer About course',
      label_syllabus: 'Course syllabus',
      label_syllabuses: 'Course syllabuses',
      label_semesters: 'Semesters',
      course_short_semester: {
        1: 'Spring',
        2: 'Autumn'
      },
      ongoing_label: 'ongoing',
      label_memos: 'Course Memos',
      label_course_offering: 'Course offering',
      label_memo: 'Course Memo',
      label_version: 'Ver',
      label_latest_version: 'latest version',
      no_syllabuses: 'This course doesn´t have an approved course syllabus.',
      no_memos: 'This course has no published course memos.',
      no_analyses: 'This course has no published Course Analyses.',
      label_analyses: 'Course Analyses',
      label_analysis: 'Course Analysis',
      analysis_table_heading1: 'Course Offering',
      analysis_table_heading2: 'Course Analysis'
    }
  },
  tableHeaders: {
    info_manually_edited: 'Course data has been registered manually',
    header_main_publish_new: 'Publish new course analysis with course data (for course coordinator)',
    aria_label_close_icon: 'Close',
    aria_label_info_icon: 'More information',
    table_headers_with_popup: {
      examiners: {
        header: 'Examiners',
        popoverText:
          'The examiners of the course at the time for the course offering. Examiners are administrated in Kopps.'
      },
      examRounds: {
        header: 'Examination',
        popoverText:
          'Form of examinataion for the course offering in the format: examination module, credits, grading scale. View details about Examination on the page Before course selection.'
      },
      alterationText: {
        header: 'Changes of the course before this course offering',
        popoverText:
          'Summarized changes made to the course before this particular course offering. The purpose of publishing changes made to the course is to show the improvements of the course over time. All changes documented to the course offerings gives an overview of the improvement steps of the course.'
      },
      examinationGrade: {
        header: 'Result',
        popoverText:
          'Graduation rate is defined as the number of passed first registration students on the whole course divided by the number of registered student (as defined above) after the first ordinary examination after the end date of the course offering. Graduation rate is not calculated for each examination session in the course examination set. Neither is it recalculated after each following re-examination. Graduation rate is calculated based on information fetched from Ladok.'
      },
      responsibles: {
        header: 'Coordinator',
        popoverText:
          'All the course coordinators for the all the administrative course instances that are included in the course offering. Course coordinators are administrated in Kopps.'
      },
      registeredStudents: {
        header: 'Students',
        popoverText:
          'Number of registered students are defined as the number of first registration students on all the administrative course instances that are included in the course offering. Admitted students that have not been registered shall not be counted. Neither shall registered students that have been re-registered from a previous administrative course instance counted. Number of registered students is calculated based on information fetched from Ladok.'
      }
    },
    extra_kopps_info: {
      no_added: 'No information inserted',
      commentExam: {
        header: 'Examination comments',
        popoverText: 'Examination comments for the course offering examination.'
      },
      programmeCodes: { header: 'Compulsory within programme', popoverText: '' },
      analysisName: {
        header: 'The course analysis applies to following course offerings',
        popoverText:
          'All the administrative course instances that was included in the course offering. Students are admitted to an administrative course instance. Degree program students and non-programme students are admitted to different administrative course instances but may be educated in the same course offering. A course offering is thereby the practical realisation of the course with a common start date, common pace, common timetable etc. for all students. Several administrative course instances are grouped to one course offering'
      }
    },
    extra_dates_and_comments: {
      no_added: 'No information inserted',
      publishedDate: 'Published first time',
      changedAfterPublishedDate: 'Last time changed',
      commentChange: 'Comments to changes in course data or course analysis after publishing',
      no_date_last_changed: 'No changes since first published.',
      page_lang: 'en'
    },
    header_more_info: 'Additional data about the course analysis',
    link_analysis: { label_analysis: 'Course analysis', no_added_doc: 'No course analysis added' },
    link_memo: { label_memo: 'Course memo', no_added_doc: 'No course memo added' },
    no_course_analys:
      'When the course analysis has been published, the course data, course memo and course syllabus are displayed.',
    course_short_semester: {
      1: 'Spring ',
      2: 'Autumn '
    }
  },
  pageTitles: {
    about_course: 'About course',
    course_admin_title: 'Administer About course', //Administrate
    course_dev_title: 'Course development',
    course_info_title: 'Course information',
    regulated_link: '“Guidelines on course evaluation and course analysis”. ',
    info_text: {
      0: '',
      1: 'On this page, the course coordinator or examiner will publish course analyzes with course data for a course offering. This is regulated by the ',
      2: 'When the course analysis has been published, the course data, the course memo and course syllabus are displayed. All course syllabuses and course memos are shown on the page ',
      3: 'Prospective, current and former students can take part of the information to help with course selection, or to follow up their own participation. Teachers, course coordinators, examiners etc. can use the page as a support in course development.'
    },
    label_syllabus_link: 'Course syllabus',
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
