'use strict';

module.exports = {
  assets: '../../themes/' + config.theme + '/assets/',
  styles: 'public/styles/**.scss',
  entry: 'public/index.js',
  dist: 'dist/',
  get distScripts () { return this.assets + 'js/' },
  get distStyles () { return this.assets + 'css/' },
  sourceFiles: './public/**/*.js',
  watch: ['**.js', 'styles/**.scss'].map(function (path) {
      return 'public/' + path;
  })
}