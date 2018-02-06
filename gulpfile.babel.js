'use strict';
import debug from 'gulp-debug';
import gulp from 'gulp';
import babel from 'gulp-babel';
import newer from 'gulp-newer';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
const reload = browserSync.reload;

const AUTOPREFIXER_BROWSERS = {
  browsers: ['last 1 version']
};

const paths = {
  dest: 'assets/',
  styles: {
    src: '_sass/**/*.scss'
  },
  scripts: {
    src: '_javascript/**/*.js'
  }
}

export function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([ autoprefixer(AUTOPREFIXER_BROWSERS) ]))
      .pipe(concat('main.css'))
        .pipe(debug())
      .pipe(gulpif('*.css', cssnano()))
        .pipe(debug())
      .pipe(size({title: 'styles'}))
      .pipe(gulp.dest(paths.dest))
      .pipe(reload({ stream: true }))
};

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(babel({presets: ['@babel/preset-env']}))
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(size({title: 'javascripts'}))
      .pipe(gulp.dest(paths.dest))
      .pipe(reload({ stream: true }))
};

var serve = gulp.series(styles, scripts, function() {
  browserSync({
    files: [ '*.html', 'assets/*' ],
    server: {
      baseDir: '.'
    }
  });

  gulp.watch('_sass/**/*.scss', styles);
  gulp.watch('_javascript/**/*.js', scripts);
})

var build = gulp.series(gulp.parallel(styles, scripts));

gulp.task('build', build);
gulp.task('serve', serve);
gulp.task('default', build);
