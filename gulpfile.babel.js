'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import gulpWwebpack from 'webpack-stream';
import webpack from 'webpack';
import named from 'vinyl-named';

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
  modules: 'assets/scripts/modules/*js',
  styles: 'assets/styles/*.scss',
  images: 'assets/images/**/*',
  fonts: 'assets/fonts/**/*'
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

gulp.task('fonts', () => {
  return gulp.src([SRC.fonts])
    .pipe(gulp.dest(DIST.fonts))
    .pipe($.size({title: 'fonts'}));
});

gulp.task('images', () => {
  return gulp.src([SRC.images])
    .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true
      })))
    .pipe(gulp.dest(DIST.images))
    .pipe($.size({title: 'images'}));
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
    .pipe($.size({title: 'styles', showFiles: true}));
});

gulp.task('modules', function () {
  let commonPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
  return gulp.src(SRC.modules)
    .pipe(named())
    .pipe(gulpWwebpack({
      module: {
        loaders: [{ test: /\.js$/, loader: 'babel-loader' }]
      },
      plugins: [commonPlugin]
    }, webpack))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(DIST.scripts))
    .pipe($.size({title: 'modules', showFiles: true}));
});

gulp.task('watch', () => {
  // Watch files for changes & reload
  gulp.watch([SRC.styles], ['styles']);
  gulp.watch([SRC.modules], ['modules']);
  gulp.watch([SRC.fonts], ['fonts']);
  gulp.watch([SRC.images], ['images']);
});

gulp.task('default', cb => {
  runSequence(
    'clean',
    ['styles', 'modules', 'images', 'fonts'],
    ['lint', 'watch'],
    cb
  );
});
