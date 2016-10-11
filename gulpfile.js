'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}

//Jsminify Task
//This task will compress javascript files and put minified files into /minjs
gulp.task('jsminify', function(){
    gulp.src('web/bundles/randomsoftvisionsource/js/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest('web/bundles/randomsoftvisionsource/minjs'));
});

//Lint Task
//This task checks if there are any errors in js-files
gulp.task('lint', function(){
    gulp.src('web/bundles/randomsoftvisionsource/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//Sass Task
//This task will compile sass files into compressed css
gulp.task('sass', function(){
  gulp.src('./web/bundles/randomsoftvisionsource/scss/**/*.scss')
      .on('error', errorLog)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest('./web/bundles/randomsoftvisionsource/css/'));
});

//Watch Task
//Watches JS, CSS and SCSS
gulp.task('watch', function () {
    gulp.watch('./web/bundles/randomsoftvisionsource/js/*.js', ['jsminify']);
    gulp.watch('./web/bundles/randomsoftvisionsource/scss/**/*.scss', ['sass']);
});


gulp.task('default', ['lint', 'jsminify', 'sass', 'watch']);