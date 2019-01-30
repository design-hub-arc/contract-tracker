const { src }       = require('gulp');
const { dest }      = require('gulp');

const through2      = require('through2');
const ejs           = require('ejs');


//// *.ejs
// Compile .ejs files to .html files in the build directory
function gulp_ejs(data, options)
{
  return through2.obj((file, enc, cb) => {
    let contents = file.contents.toString();

    try {
      contents = ejs.render(contents, data, options);
    } catch(err) {
      cb(err);
      return;
    }

    file.contents = Buffer.from(contents);

    file.extname = '.html';
    cb(null, file);
  });
}


function buildEJS()
{
  const data = {
    site_name: "Contract Tracker"
  };

  return src('src/html/complete/**/*.ejs')
    .pipe(gulp_ejs(data, {root: process.cwd() + "/src/html/"}))
    .pipe(dest('build/html/'));
}


function copyHTML()
{
  return src("src/html/complete/**/*.html")
    .pipe(dest("build/html/"));
}

exports.copyHTML = copyHTML;
exports.buildEJS = buildEJS;
