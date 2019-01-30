const { src }       = require('gulp');
const { dest }      = require('gulp');

const gulp_sass     = require('gulp-sass');
const node_sass     = require('node-sass');


// Configure
gulp_sass.compiler = node_sass;

// Compile .scss or .sass files into .css files in the build dirctory
function buildSCSS()
{
  return src('src/css/complete/**/*.scss')
    .pipe(gulp_sass())
    .pipe(dest('build/css'));
};


function buildCSS()
{
  return src("src/css/complete/**/*.css")
    .pipe(dest("build/css/"));
}


exports.buildCSS = buildCSS;
exports.buildSCSS = buildSCSS;
