var gulp = require('gulp')
var eslint = require('gulp-eslint')
var minifyCss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
// var browserSync = require('browser-sync').create()

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
    gulp.src([
        './src/js/utils.js',
        './src/js/map.js',
        './src/js/editor.js',
        './src/js/boxbot.js',
        './src/js/finder.js',
        './src/js/command.js',
        './src/js/app.js',
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
})

gulp.task('default', function () {
    gulp.start('lint', 'minifyCss', 'scripts')
    gulp.watch(['./src/css/*.css', './src/js/*.js', './dist/index.html'], function() {
        gulp.start('minifyCss', 'scripts')
    })
})
