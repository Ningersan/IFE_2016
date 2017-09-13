var gulp = require('gulp')
var eslint = require('gulp-eslint')
var browserSync = require('browser-sync').create()

gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('browser-sync', function() {
    browserSync.init({
        files: [
            './*.html',
            './js/*.js',
        ],
        server: {
            baseDir: './',
        },
    })
})

gulp.task('watch', function() {
    gulp.watch([
        './*.html',
        './js/*.js',
    ], browserSync.reload)
})

gulp.task('default', ['browser-sync'])
