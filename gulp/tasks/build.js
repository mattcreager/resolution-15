'use strict';

/**
 * @fileOverview
 * Build Task
 * Run browserify & less tasks, and copy fonts to public directory
 */

var gulp = require('gulp');
var handleErrors = require('../util/error-handler');

gulp.task('build', ['less', 'browserify'], function() {
  return gulp.src('./node_modules/bootstrap/fonts/**')
    .pipe(gulp.dest('./app/client/public/fonts'))
    .on('error', handleErrors);
});