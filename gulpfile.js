const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const pug = require('gulp-pug');
const clean = require('gulp-clean');
const includeFiles = require('gulp-include');

const { DIST_PATH, SRC_PATH, STYLES_LIBS } = require('./gulp.config');

const path = {
  build: {
    html: `${DIST_PATH}`,
    js: `${DIST_PATH}/js`,
    css: `${DIST_PATH}/css`,
    images: `${DIST_PATH}/img`,
    icons: `${DIST_PATH}/img/icons`,
    fonts: `${DIST_PATH}/fonts`,
  },
  src: {
    html: `${SRC_PATH}/**/*.html`,
    pug: `${SRC_PATH}/**/*.pug`,
    js: `${SRC_PATH}/js/*.js`,
    css: `${SRC_PATH}/styles/main.scss`,
    fontFaces: `${SRC_PATH}/styles/fonts.scss`,
    images: `${SRC_PATH}/images/*.*`,
    icons: `${SRC_PATH}/images/icons/*.svg`,
    fonts: `${SRC_PATH}/fonts/**/*`,
  },
  watch: {
    html: `${SRC_PATH}/**/*.html`,
    pug: `${SRC_PATH}/**/*.pug`,
    js: `${SRC_PATH}/js/**/*.js`,
    css: `${SRC_PATH}/styles/**/*.scss`,
    images: `${SRC_PATH}/images/*.*`,
    icons: `${SRC_PATH}/images/icons/*.svg`,
  },
  dist: `${DIST_PATH}`,
};

function server() {
  browserSync.init({
    server: {
      baseDir: path.dist,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
    open: false,
  });
}

function copyImages() {
  return src(path.src.images)
    .pipe(plumber())
    .pipe(dest(path.build.images))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function styles() {
  return src([path.src.fontFaces, ...STYLES_LIBS, path.src.css], {
    allowEmpty: true,
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(concat('main.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(
      reload({
        stream: true,
      })
    );
}
function styles_prod() {
  return src([...STYLES_LIBS, path.src.css], { allowEmpty: true })
    .pipe(plumber())
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(dest(path.build.css))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function removeFilesFromDist() {
  return src(path.dist, {
    read: false,
    allowEmpty: true,
  }).pipe(clean());
}

function copyHtml() {
  return src(path.src.html)
    .pipe(plumber())
    .pipe(dest(path.dist))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function copyFonts() {
  return src(path.src.fonts).pipe(plumber()).pipe(dest(path.build.fonts));
}

function pugToHtml() {
  return src(path.src.pug, {
    ignore: ['./**/common/*.pug', './**/components/*.pug'],
  })
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(dest(path.build.html))
    .pipe(reload({ stream: true }));
}

function htmlToHtml() {
  return src(path.src.html)
    .pipe(
      includeFiles({
        includePaths: './src/components/**/',
      })
    )
    .pipe(dest(path.build.html))
    .pipe(reload({ stream: true }));
}

function scripts() {
  return src(path.src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js', { newLine: ';' }))
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.js))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function scripts_prod() {
  return src(path.src.js)
    .pipe(plumber())
    .pipe(concat('main.js', { newLine: ';' }))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function icons() {
  return src(path.src.icons)
    .pipe(plumber())
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: { attrs: '(fill|stroke|style|width|height|data.*)' },
          },
        ],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest(path.build.icons));
}

function watching() {
  watch(path.watch.html, htmlToHtml);
  // watch(path.watch.pug, pugToHtml);
  watch(path.watch.css, styles);
  watch(path.watch.js, scripts);
  watch(path.watch.images, copyImages);
  watch(path.watch.icons, icons);
}

exports.default = series(
  removeFilesFromDist,
  parallel(htmlToHtml, copyFonts, copyImages, styles, scripts),
  parallel(server, watching)
);

exports.build = series(
  removeFilesFromDist,
  parallel(htmlToHtml, copyFonts, copyImages, styles_prod, scripts_prod),
  parallel(server, watching)
);
