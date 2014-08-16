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
  livereload = require('gulp-livereload'),
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
      scripts: 'build/js',
      styles: 'build/css'
    }
  };

/*
 * Core Tasks
 */

gulp.task('clean', function () {
  return gulp.src(['build/**/*.*', 'build/**/*', 'build'])
    .pipe(clean());
});

gulp.task('lint', ['clean'], function() {
  return gulp.src(paths.src.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('compass', ['clean'], function() {
  return gulp.src('app/styles/*.scss')
    .pipe(compass({
      css: 'build/css',
      sass: 'app/styles',
      logging: false
    }))
    .pipe(livereload());
});

gulp.task('templates', ['lint'], function() {
  return gulp.src(paths.src.templates)
    .pipe(handlebars({
      outputType: 'browser',
      namespace: 'Ember.TEMPLATES'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(livereload());
});

gulp.task('scripts', ['lint'], function(prod) {
  var stream = gulp.src(paths.src.scripts);
  if (prod) {
    stream
      .pipe(uglify({ mangle: false }))
      .pipe(concat('main.min.js'));
  }
  return stream
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(livereload());
});

gulp.task('inject', ['compass' ,'templates', 'scripts'], function () {
  return gulp.src('app/index.html')
    .pipe(inject(gulp.src(['build/js/**/*.js', 'build/css/**/*.css'], { read: false })))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['inject'], function() {
  livereload.listen();
  gulp.watch(paths.src.styles, ['compass']);
  gulp.watch(paths.src.templates, ['templates']);
  gulp.watch(paths.src.scripts, ['scripts']);
  gulp.watch(paths.src.index, ['inject']);
});

/*
 * Aliases
 */

gulp.task('build', ['clean', 'lint', 'compass', 'templates', 'scripts', 'inject']);
gulp.task('dev', ['clean', 'lint', 'compass', 'templates', 'scripts', 'inject', 'watch']);
gulp.task('default', ['dev']);
