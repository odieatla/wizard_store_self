"use restrict";

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

gulp.task('babel', () => {
  return gulp.src('/src/**/*.babel.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dest/'));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint({
      extends: 'eslint:recommended',
      envs: ['es6', 'node', 'browser']
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', () => {
  return nodemon({
    script: 'app.js',
    ignore: ['node_modules/'],
    ext: 'js css',
    tasks: ['lint'] // tasks listed here only run before re-build, not the first-time build
  });
});

gulp.task('build', ['lint', 'server']);
