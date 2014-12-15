var gulp = require('gulp');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');

var handleErrors = require('../util/error-handler');

var minimist = require('minimist');

var knownOptions = {
  string: 'watch',
  default: { watch: false }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('lint', function() {
  var stream = gulp.src(['./app/**/*.js', './app/**/*.jsx', '!./app/client/public/main-build.js'])
    .pipe(cache('jshint'))
    .pipe(react())
    .on('error', handleErrors)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  if (process.env.CI) {
    stream = stream.pipe(jshint.reporter('fail'));
  }

  if (options.watch) {
    gulp.watch(['./app/**/*.js', './app/**/*.jsx', '!./app/client/public/main-build.js'], ['lint']);
  }

  return stream;
});
