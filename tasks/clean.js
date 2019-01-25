const { src }       = require('gulp');
const { dest }      = require('gulp');

const gulp_clean    = require('gulp-clean');


function cleanAll()
{
  return src('build', {read: false})
    .pipe(gulp_clean());

}
