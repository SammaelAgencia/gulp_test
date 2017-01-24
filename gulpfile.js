const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('sass',() => {
  gulp.src('./sass/*.sass')
  .pipe(sass({
    outputStyle: 'expanded',
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

gulp.task('serve', ['sass', 'pug'],() => {
  browserSync.init(["app/css/**/*.css", "app/js/**/*.js", "app/*.html"], {
    server: {
      baseDir: './app'
    }
  })
});

gulp.task('watch', ['sass', 'pug', 'serve'],() =>{
  gulp.watch(['sass/**/*.sass'], ['sass']);
  gulp.watch(['pug/**/*.pug'], ['pug']);
})

gulp.task('default', ['watch']);
