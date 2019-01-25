const { src }       = require('gulp');
const { dest }      = require('gulp');

const gulp_sass     = require('gulp-sass');
const node_sass     = require('node-sass');
const gulp_clean    = require('gulp-clean');


// Configure
gulp_sass.compiler = node_sass;


//// *.scss | *.sass
// Compile .scss or .sass files into .css files in the build dirctory

function compileSCSS()
{
  return src('src/css/**/*.scss')
    .pipe(gulp_sass())
    .pipe(dest('build/css'));
};


function cleanSCSS()
{
  return src('build/css/**/*.scss', {read: false})
    .pipe(gulp_clean());
}
