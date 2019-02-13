const { src }       = require('gulp');
const { dest }      = require('gulp');

const webpack       = require('webpack-stream');
const named         = require('vinyl-named');


function bundleJS(cb)
{
  return src("src/js/complete/**/*")
    .pipe(named())
    .pipe(webpack({
      mode: "development",
      target: "web",
      output: {
        filename: "[name].js"
      },
      module:
      {
        rules:
        [
          {
            test: /\.(js|jsx)$/,
            use:
            {
              loader: 'babel-loader',
              options:
              {
                presets:
                [
                  [
                    '@babel/preset-env',
                    {
                      "targets": "> 0.25%, not dead"
                    }
                  ],
                  '@babel/preset-react'
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(dest("build/js/"));
}


exports.bundleJS = bundleJS;
