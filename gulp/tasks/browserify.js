/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var bundleLogger = require('../util/bundle-logger');
var handleErrors = require('../util/error-handler');
var reactify = require('reactify');
var path = require('path');

gulp.task('browserify', function() {
  var bundler = browserify(path.resolve(__dirname, '../..', 'app/client/index.js'), {
    basedir: __dirname,
    debug: true,
    cache: {},        // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: true,  // required for watchify,
    globals: false
  });

  if (global.isWatching) {
    bundler = watchify(bundler);
  }

  bundler.transform(reactify);

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the stream gulp compatible
      .pipe(source('main-build.js'))
      .pipe(gulp.dest('./app/client/public'))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});