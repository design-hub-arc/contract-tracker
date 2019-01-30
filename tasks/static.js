const { src }       = require('gulp');
const { dest }      = require('gulp');


// Copy static assets like images
function copyStatic()
{
  return src("src/static/**/*")
    .pipe(dest("build/static/"));
}


exports.copyStatic = copyStatic;
