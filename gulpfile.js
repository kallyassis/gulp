const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');  // minifica CSS
const sourcemaps = require('gulp-sourcemaps'); //mapear  css
const uglify = require('gulp-uglify'); //comprimir JS
const obfuscate = require('gulp-obfuscate'); //Dificulta a leitura do CÓDIGO javascript
const imagemin = require('gulp-imagemin'); //Comprime imagens no geral

function comprimeImage() {
    return  gulp.src('./source/image/**/*.{jpg,jpeg,png,gif,svg}')
            .pipe(imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
            plugins: [
            { removeViewBox: false },
            { cleanupIDs: false }
            ]
        })
        ]))

    .pipe(gulp.dest('./build/image'));
}

function comprimeJS() {
    return gulp.src('./source/script/*.js')
    .pipe(uglify())
    .pipe(obfuscate()) //Dificulta a leitura do CÓDIGO javascript
    .pipe(gulp.dest('./build/script'));
    
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init()) //mapear o css 
    .pipe(sass({ // compila SCSS
        outputStyle: 'compressed'
    }))
    .pipe(cleanCss()) // minifica CSS
    .pipe(sourcemaps.write('./maps')) //mapear o css 
    .pipe(gulp.dest('./build/styles'));
}




exports.default = function () {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/script/*.js',  {ignoreInitial: false}, gulp.series(comprimeJS))
    gulp.watch('./source/image/**/*.{jpg,jpeg,png,gif,svg}', {ignoreInitial: false}, gulp.series(comprimeImage))
}