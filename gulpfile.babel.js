import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const task = gulp.task;

const paths = {
  api: 'api/**/*.js',
  tasks: 'task/**/*.js',
  config: 'config/**/*.js',
  test: 'test/**/*.test.js',
  scripts: 'assets/scripts/**/*.js',
  styles: 'assets/styles/**/*.scss',
  images: 'assets/images/**/*.{png,jpg}',
  fonts: 'assets/fonts/*'
};

gulp.task('lint', () => {
    return gulp.src([paths.tasks, paths.config, paths.api, paths.scripts])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

gulp.task('watch', () => {
  // Watch files for changes & reload
  gulp.watch([paths.scripts], ['lint']);
});

gulp.task('default', ['lint'], () => {
  // This will only run if the lint task is successful...
  // gulp.task('watch');
});
