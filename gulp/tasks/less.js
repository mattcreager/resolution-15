'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var rename = require("gulp-rename");

var handleErrors = require('../util/error-handler');

gulp.task('less', function () {
  gulp.src('./app/client/less/**/*.less')
    .pipe(less({
      paths: [ 
        path.join(__dirname, 'less', 'includes'),
        path.resolve('./node_modules', 'bootstrap', 'less'),
        path.resolve('./node_modules', 'normalize.less')
      ]
    }))
    .pipe(rename('main-build.css'))
    .pipe(gulp.dest('./app/client/public'))
    .on('error', handleErrors);
});