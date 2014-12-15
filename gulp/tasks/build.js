'use strict';

var gulp = require('gulp');
var handleErrors = require('../util/error-handler');

gulp.task('build', ['lint', 'less', 'browserify'], function() {
  return gulp.src('./node_modules/bootstrap/fonts/**')
    .pipe(gulp.dest('./app/client/public/fonts'))
    .on('error', handleErrors);
});