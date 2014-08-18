var
  /*
   * Dev dependencies
   */
  gulp = require('gulp'),
  compass = require('gulp-compass'),
  watch = require('gulp-watch'),
  handlebars = require('gulp-ember-handlebars'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  inject = require('gulp-inject'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  connect = require('gulp-connect'),
  /*
   * Other
   */
  paths = {
    src: {
      base: 'app',
      index: 'app/index.html',
      scripts: 'app/js/**/*.js',
      styles: 'app/styles/**/*.scss',
      templates: 'app/templates/**/*.hbs'
    },
    dest: {
      base: 'build',
      clean: ['build/**/*.*', 'build/**/*', 'build'],
      index: 'build/index.html',
      injectable: ['build/js/**/*.js', 'build/css/**/*.css'],
      scripts: 'build/js',
      styles: 'build/css'
    }
  };

/*
 * Core Tasks
 */

gulp.task('clean', function () {
  return gulp.src(paths.dest.clean)
    .pipe(clean());
});

gulp.task('lint', ['clean'], function() {
  return gulp.src(paths.src.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('compass', ['clean'], function() {
  return gulp.src(paths.src.styles)
    .pipe(compass({
      css: paths.dest.styles,
      sass: 'app/styles',
      logging: false
    }))
    .pipe(connect.reload());
});

gulp.task('templates', ['lint'], function() {
  return gulp.src(paths.src.templates)
    .pipe(handlebars({
      outputType: 'browser',
      namespace: 'Ember.TEMPLATES'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(connect.reload());
});

gulp.task('scripts', ['lint'], function() {
  return gulp.src(paths.src.scripts)
    // .pipe(uglify({ mangle: false }))
    // .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(connect.reload());
});

gulp.task('copy-index', ['scripts', 'templates', 'compass'], function (cb) {
  return gulp.src(paths.src.index)
    .pipe(gulp.dest(paths.dest.base));
});

gulp.task('copy-vendor', ['copy-index'], function (cb) {
  return gulp.src('vendor/**/*')
    .pipe(gulp.dest('build/vendor'));
});

gulp.task('inject', ['copy-index', 'copy-vendor'], function () {
  return gulp.src(paths.dest.index)
    .pipe(inject(gulp.src(paths.dest.injectable, { read: false }), {relative: true}))
    .pipe(gulp.dest(paths.dest.base));
});

gulp.task('connect', ['inject'],function() {
  connect.server({
    root: ['build'],
    livereload: true
  });
});

gulp.task('watch', ['inject'], function() {
  gulp.watch(paths.src.styles, ['compass', 'inject']);
  gulp.watch(paths.src.templates, ['templates', 'inject']);
  gulp.watch(paths.src.scripts, ['scripts', 'inject']);
  gulp.watch(paths.src.index, ['inject']);
});

/*
 * Aliases
 */

gulp.task('build', ['clean', 'lint', 'compass', 'templates', 'scripts', 'inject']);
gulp.task('dev', ['clean', 'lint', 'compass', 'templates', 'scripts', 'inject', 'connect', 'watch']);
gulp.task('default', ['dev']);
