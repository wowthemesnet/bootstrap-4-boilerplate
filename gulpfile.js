"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
     autoprefixer = require('gulp-autoprefixer'),
     browserSync = require('browser-sync').create(),
     htmlreplace = require('gulp-html-replace'),
     cssmin = require('gulp-cssmin');

gulp.task("concatScripts", function() {
    return gulp.src([
        'assets/js/jquery.js',
        'assets/js/popper.min.js',
        'assets/js/bootstrap.min.js'
        ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("assets/js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('docs/assets/js'));
});

gulp.task('compileSass', function() {
  return gulp.src(["assets/css/main.scss","assets/css/theme.scss"])
      .pipe(maps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('assets/css'))
      .pipe(browserSync.stream());
});

gulp.task("minifyCss", ["compileSass"], function() {
  return gulp.src("assets/css/main.css")
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('docs/assets/css'));
});

gulp.task('watchFiles', function() {
  gulp.watch('assets/css/**/*.scss', ['compileSass']);
  gulp.watch('assets/js/*.js', ['concatScripts']);
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function() {
  del(['docs', 'assets/css/main.css*', 'assets/css/theme.css*', 'assets/js/main*.js*']);
});

gulp.task('renameSources', function() {
  return gulp.src('*.html')
    .pipe(htmlreplace({
        'js': 'assets/js/main.min.js',
        'css': 'assets/css/main.min.css',
    }))
    .pipe(gulp.dest('docs/'));
});

gulp.task("build", ['minifyScripts', 'minifyCss'], function() {
  return gulp.src(['*.html', '*.php','*.css','favicon.ico',
                   "assets/img/**","assets/css/theme.css","assets/js/theme.js","assets/fonts/**"], { base: './'})
            .pipe(gulp.dest('docs'));
});

gulp.task('serve', ['watchFiles'], function(){
  browserSync.init({
        server: "./"
    });

    gulp.watch("assets/css/**/*.scss", ['watchFiles']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task("default", ["clean", 'build'], function() {
  gulp.start('renameSources');
});
