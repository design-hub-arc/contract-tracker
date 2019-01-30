const { src }       = require('gulp');
const { dest }      = require('gulp');


// Copy server .js files to the build directory
function copyServerJS()
{
  return src("src/server/js/**/*.js")
    .pipe(dest("build/server/js/"));
}


exports.copyServerJS = copyServerJS;
