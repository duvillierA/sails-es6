'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';

const $ = gulpLoadPlugins();
const DIST = {
  scripts: '.tmp/public/scripts',
  styles: '.tmp/public/styles',
  images: '.tmp/public/images',
  fonts: '.tmp/public/fonts'
};
const SRC = {
  api: 'api/**/*.js',
  tasks: 'task/**/*.js',
  config: 'config/**/*.js',
  test: 'test/**/*.test.js',
  scripts: 'assets/scripts/**/*.js',
  styles: 'assets/styles/*.scss',
  images: 'assets/images/**/*.{png,jpg}',
  fonts: 'assets/fonts/*'
};
const AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'last 2 Firefox versions',
  'last 2 Chrome versions',
  'last 5 Safari versions',
  'last 5 Opera versions',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Clean output directory
gulp.task('clean', () => del(['.tmp/public/*'], {dot: true}));

gulp.task('lint', () => {
  return gulp.src([SRC.tasks, SRC.config, SRC.api, SRC.scripts])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('styles', () => {
  return gulp.src(SRC.styles)
    .pipe($.changed(DIST.styles, {extension: '.css'}))
    .pipe($.sourcemaps.init())
    .pipe($.sass({precision: 10}).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(DIST.styles))
    .pipe($.size({
      title: 'styles',
      showFiles: true
    }));
});

gulp.task('watch', () => {
  // Watch files for changes & reload
  gulp.watch([SRC.styles], ['styles']);
});

gulp.task('default', cb => {
  // This will only run if the lint task is successful...
  runSequence(
    'clean',
    ['styles'],
    ['lint', 'watch'],
    cb
  );

});
