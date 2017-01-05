const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('sass',() => {
  gulp.src('./sass/*.sass')
  .pipe(sass({
    outputStyle: 'expanded',
    sourceComments: true
  }))
  .pipe(autoprefixer({
    versions: ['last 2 browsers']
  }))
  .pipe(gulp.dest('./app/css/'))
});

gulp.task('pug', () => {
  gulp.src('./pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./app/'))
})

gulp.task('default', () => {
  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./pug/**/*.pug', ['pug']);

  browserSync.init({
    server: './app/'
  });

  gulp.watch('./app/*.html').on('change', browserSync.reload)
  gulp.watch('./app/css/*.css').on('change', browserSync.reload)
  gulp.watch('./app/js/*.js').on('change', browserSync.reload)

});
