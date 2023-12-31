const { src, dest } = require('gulp');
// const { deleteAsync } = require('del');
// import { deleteAsync } from 'del';

// Кофигурации
const path = require('../config/path.js');

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');

// Обработка HTML
const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: 'HTML',
          message: error.message,
        })),
      }),
    )
    .pipe(fileInclude())
    .pipe(size({ title: 'До сжатия' }))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(size({ title: 'После сжатия' }))
    .pipe(dest(path.html.dest));
};

module.exports = html;
