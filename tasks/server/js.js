const { series }    = require('gulp');
const { parallel }  = require('gulp');


////// server/js
//// server/*.js
// Copy server .js files to the build directory
function copyServerJS()
{
  return src("src/server/js/**/*.js")
    .pipe(dest("build/server/js/"));
}

function cleanServerJS()
{
  return src('build/server/js/**/*.js', {read: false})
    .pipe(gulp_clean());
}
