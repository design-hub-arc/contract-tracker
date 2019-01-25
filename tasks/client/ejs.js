const { src }       = require('gulp');
const { dest }      = require('gulp');

const through2      = require('through2');
const gulp_clean    = require('gulp-clean');
const ejs           = require('ejs');

//// *.ejs
// Compile .ejs files to .html files in the build directory
function gulp_ejs(data, options)
{
  return through2.obj((file, enc, cb) => {
    let contents = file.contents.toString();

    try {
      contents       = ejs.render(contents, data, options);
    } catch(err) {
      cb(err);
      return;
    }

    file.contents  = Buffer.from(contents);

    file.extname = '.html';
    cb(null, file);
  });
}


function compileEJS()
{
  return src('src/html/**/*.ejs')
    .pipe(gulp_ejs({user: "Devin Scholl"},
                   {root: process.cwd() + "/src/html/"}))
    .pipe(dest('build/html/'));
}

function cleanEJS()
{
  return src('build/html/**/*.html', {read: false})
    .pipe(gulp_clean());
}
