const { src }       = require('gulp');
const { dest }      = require('gulp');

const gulp_clean    = require('gulp-clean');


////// css/
//// *.css
// Copy .css files to the build directory
function buildCSS()
{
  return src("src/css/**/*.css")
    .pipe(dest("build/css/"));
}

function cleanCSS()
{
  return src('build/css/**/*.css', {read: false})
    .pipe(gulp_clean());
}


exports.build_css = buildCSS;
exports.clean_css = cleanCSS;
