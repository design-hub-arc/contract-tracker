const { series }    = require('gulp');
const { parallel }  = require('gulp');


//// server/*.ejs
// Copy server .ejs files to the build directory
function copyServerEJS()
{
  return src("src/server/html/**/*.ejs")
    .pipe(dest("build/server/html/"));
}

function cleanServerEJS()
{
  return src('build/server/html/**/*.ejs', {read: false})
    .pipe(gulp_clean());
}
