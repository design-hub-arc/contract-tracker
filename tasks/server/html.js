const { series }    = require('gulp');
const { parallel }  = require('gulp');


////// server/html
//// server/*.html
// Copy server .html files to the build directory

function copyServerHTML()
{
  return src("src/server/html/**/*.html")
    .pipe(dest("build/server/html/"));
}

function cleanServerHTML()
{
  return src('build/server/html/**/*.html', {read: false})
    .pipe(gulp_clean());
}
