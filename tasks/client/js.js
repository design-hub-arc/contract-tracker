const { src }       = require('gulp');
const { dest }      = require('gulp');

const babel         = require('@babel/core');
const through2      = require('through2');
const gulp_clean    = require('gulp-clean');


////// js/
//// *.js
// Copy .js files to the build directory

function gulp_babel(options)
{
  return through2.obj((file, enc, cb) => {
    let contents = file.contents.toString();

    babel.transform(contents, options, (err, result) => {
      if (err)
      {
        cb(err);
        return;
      }
      file.contents  = Buffer.from(result.code);
      //file.extname = '.js';
      cb(null, file);
    });
  });
}

/*
function compileJS()
{

  return src("src/js/**\/*.js?(x)")
    .pipe(gulp_babel({presets: [[
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead"
      }
    ], "@babel/preset-react"]}))
    .pipe(dest("build/js/"));
}
*/

var files = (source) => (regexp, cb) => {
  let files  = {};

  src(source + "**/*", {read: false})
    .pipe(through2.obj((file, enc, cb) => {
      if (regexp.test(file.path))
      {
        if(files[file.stem])
        {
          throw new Error(`Duplicate file names not allowed,( ${files[file.stem]}, ${file.path} )`);
        }
        else
        {
          files[file.stem] = file.path;
        }

      }
      cb(null, file);
    }))
    .on('finish', () => cb(files));
};

function bundleJS(cb)
{
  var jsFiles = files("src/js/complete/");
  jsFiles(/.*\.(js|jsx)$/, entries => {
    console.log(entries);

    const compiler = webpack({
      mode: "development",
      target: "web",
      entry: entries,
      output: {
        path: path.resolve(__dirname, "build/js/"),
        filename: "[name].js"
      },
      module: {
        rules: [{
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                "targets": "> 0.25%, not dead"
              }], '@babel/preset-react'],
            }
          }
        }]
      }
    });

    compiler.run((err, stats) => {
      if(err){
        cb(new Error(err));
        return;
      }

      if(stats.hasErrors()) {
        cb(new Error(stats.toString()));
        return;
      }

      console.log(stats.toString());
      cb();
    });
  });
}

function cleanJS()
{
  return src('build/js/**/*.js', {read: false})
    .pipe(gulp_clean());
}
/*
  .pipe(gulp_babel({presets: [[
  "@babel/preset-env",
  {
  "targets": "> 0.25%, not dead"
  }
  ], "@babel/preset-react"]}))
*/
