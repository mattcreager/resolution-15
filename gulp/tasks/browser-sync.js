'use strict';

var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['build'], function() {
    browserSync({
      files: [
        './app/client/public/*.html',
        './app/client/public/main-build.css',
        './app/client/public/main-build.js'
      ],
      proxy: 'localhost:5000'
    });
});