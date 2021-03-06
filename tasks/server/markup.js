const { src }       = require('gulp');
const { dest }      = require('gulp');


// Copy server .ejs files to the build directory
function copyServerEJS()
{
  return src("src/server/ejs/complete/**/*.ejs")
    .pipe(dest("build/server/ejs/"));
}


// Copy server .html files to the build directory
function copyServerHTML()
{
  return src("src/server/ejs/complete/**/*.html")
    .pipe(dest("build/server/html/"));
}


exports.copyServerEJS = copyServerEJS;
exports.copyServerHTML = copyServerHTML;
