const gulp = require('gulp')
const browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    stringify = require('stringify');
const env = 'production'
gulp.task('js', function() {
  return browserify({ 'entries': ['src/index.js'], 'debug' : env !== 'dev' })
    .transform(stringify, {
        appliesTo: { includeExtensions: ['.svg'] },
        minify: true
    })
    .bundle()
    .pipe(source('index.js')) // gives streaming vinyl file object
    .pipe(gulp.dest('dist'));
})
