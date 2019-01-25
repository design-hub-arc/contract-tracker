const { series }    = require('gulp');
const { parallel }  = require('gulp');


////// static/
//// *
function copyStatic()
{
  return src("src/static/**/*")
    .pipe(dest("build/static/"));
}

function cleanStatic()
{
  return src('build/static/**/*', {read: false})
    .pipe(gulp_clean());
}
