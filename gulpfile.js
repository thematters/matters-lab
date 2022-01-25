'use strict';

const gulp         = require('gulp');
const gulpIf       = require('gulp-if');
const sass         = require('gulp-sass')(require('sass'));
const pug          = require('gulp-pug');
const plumber      = require('gulp-plumber');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');

let production = false;

function html() {
  return gulp
    .src('pug/*.pug')
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
}

function css() {
  return gulp
    .src('sass/app.min.sass')
    .pipe(plumber())
    .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
    .pipe(gulp.dest("dist/css"))
}

function js() {
  return gulp
    .src([
      'js/vendor/gsap.min.js',
      'js/vendor/*.js',
      'js/*.js',
      '!js/**/_*.js'
    ])
    .pipe(plumber())
    .pipe(gulpIf(production, uglify()))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js'))
}

gulp.task('default',
  gulp.series(gulp.parallel(html, js, css))
);

gulp.task('build', gulp.series((done) => { 
  production = true;
  done();
}, 'default'));

gulp.task("watch", gulp.series('default', () => {
  production = false;
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('pug/**/*.pug', gulp.series(html)).on('change', browserSync.reload);
  gulp.watch('sass/**/*.sass', gulp.series(css)).on('change', browserSync.reload);
  gulp.watch('js/*.js', gulp.series(js)).on('change', browserSync.reload);
}));