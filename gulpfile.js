'use strict'
const gulp = require('gulp')
const mergeStream = require('merge-stream')

const globals = {
  dirname: __dirname
}

const { clean } = require('kth-node-build-commons').tasks(globals)
const { moveHandlebarPages } = require('kth-node-web-common/gulp')

/* Inferno build tasks */

/**
 * Usage:
 *
 *  One-time build of browser dependencies for development
 *
 *    $ gulp build:dev [--production | --development]
 *
 *  Deployment build
 *
 *    $ gulp build
 *
 *  Continuous re-build during development
 *
 *    $ gulp watch
 *
 *  Remove the generated files
 *
 *    $ gulp clean
 *
 */

// *** JavaScript helper tasks ***
gulp.task('moveHandlebarPages', moveHandlebarPages)

gulp.task('moveImages', function () {
  // Move project image files
  return gulp.src('./public/img/**/*')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('moveIcons', function () {
  // Move project image files
  return gulp.src('./public/css/*')
    .pipe(gulp.dest('dist/css'))
})

/**
 *
 *  Public tasks used by developer:
 *
 */
gulp.task('clean', clean)

gulp.task('build', ['moveHandlebarPages'])