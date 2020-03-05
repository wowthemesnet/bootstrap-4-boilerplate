const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const { src, dest } = require('gulp');

//compile scss into css
function style() {
    //1. scss location
    return gulp.src('src/scss/**/*.scss') //gets all files ending with .scss in src/scss
    //2. pass it through sass compiler
    .pipe(sass().on('error',sass.logError))
    //3. save the compiled css file
    .pipe(gulp.dest('src/css'))
    //4. stream  all browsers
    .pipe(browserSync.stream());
}


function watch() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "/index.html"
        }
    });
    gulp.watch('src/scss/**/*.scss', style);    
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('./*.html').on('change',browserSync.reload);
}

function build() {
    return src('./src/**')
      .pipe(dest('./docs/'));
  }

exports.style = style;
exports.watch = watch;
exports.build = build;