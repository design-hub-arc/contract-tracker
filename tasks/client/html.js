const { src }       = require('gulp');
const { dest }      = require('gulp');

const gulp_clean    = require('gulp-clean');


////// html/
//// *.html
// Copy .html files to the build directory

function copyHTML()
{
  return src("src/html/**/*.html")
    .pipe(dest("build/html/"));
}

function cleanHTML()
{
  return src('build/html/**/*.html', {read: false})
    .pipe(gulp_clean());
}
