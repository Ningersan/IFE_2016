var gulp = require('gulp')
var eslint = require('gulp-eslint')
var minifyCss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var optimize = require('amd-optimize')
var rename = require('gulp-rename')

gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('minifyCss', function() {
    gulp.src('./src/css/*.css')
        .pipe(minifyCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(optimize('./src/app'))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
})

gulp.task('default', function () {
    gulp.start('lint', 'minifyCss', 'scripts')
    gulp.watch(['./src/css/*.css', './src/js/*.js', './dist/index.html'], function() {
        gulp.start('minifyCss', 'scripts')
    })
})
