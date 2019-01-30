const { src }       = require('gulp');
const { dest }      = require('gulp');

const gulp_clean    = require('gulp-clean');


function cleanAll()
{
  return src('build', {read: false, allowEmpty: true})
    .pipe(gulp_clean());
}


exports.cleanAll = cleanAll;
