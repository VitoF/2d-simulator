var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] });
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    del = require('del'),
    swig = require('gulp-swig'),
    uglify = require('gulp-uglify'),
    insert = require('gulp-insert');

	
/*******************************************************************************
	SOURCES AND RESULT PATHS
*******************************************************************************/
var paths = {
    result: {
        html: 'result/views',
        css: 'result/css',
        js: 'result/js',
        images: 'result/images',
        root: 'result'
        },
    src: {
        html: 'src/views/*.html',
        htmlIndex: 'src/index.html',
        css: 'src/styles/**/*.less',
        js: 'src/scripts/**',
        jsDir: 'src/scripts',
//        libs: 'src/libs/**/',
        json: 'src/data/**/*.json',
        images: 'src/images/**'
        },
}


/*******************************************************************************
	DEFAULT TASKS
*******************************************************************************/
gulp.task('default', ['clean'], function() {
    gulp.start('run');
});

gulp.task('clean', function(cb) {
    del([paths.result.root
        ], cb);
});

gulp.task('run', ['connect'], function(){
    gulp.start('html');
    gulp.start('styles');
	gulp.start('scripts');
//	gulp.start('libs');
	gulp.start('dataJSON');
	gulp.start('images');
    gulp.watch(paths.src.htmlIndex, ['html']);
    gulp.watch(paths.src.css, ['styles']);
    gulp.watch(paths.src.js, ['scripts']);
//    gulp.watch(paths.src.libs, ['libs']);
    gulp.watch(paths.src.json, ['dataJSON']);
    gulp.watch(paths.src.images, ['images']);
});


/*******************************************************************************
	STYLES
*******************************************************************************/
gulp.task('styles', function() {
   return gulp.src(paths.src.css)
	  .pipe(concat('style.min.css'))
      .pipe(less({
        plugins: [autoprefix]
      }))
	  .pipe(minifycss())
	  .pipe(gulp.dest(paths.result.css));
});
    
/*******************************************************************************
	JS 
*******************************************************************************/

gulp.task('scripts', function() {
    gulp.start('jsClasses');
    gulp.start('jsApp');
});
//gulp.task('libs', function() {
//  return gulp.src(paths.src.libs)
////    .pipe(concat('libs.js'))
////    .pipe(gulp.dest(paths.result.js))
//    .pipe(uglify())
//    .pipe(concat('libs.min.js'))
//    .pipe(gulp.dest(paths.result.js));
//});

gulp.task('jsClasses', function() {
    return gulp.src(paths.src.jsDir + '/classes/**')
        .pipe(concat('classes.js'))
        .pipe(insert.prepend('"use strict";\n'))
        .pipe(gulp.dest(paths.result.js));
});

gulp.task('jsApp', function() {
    return gulp.src(paths.src.jsDir + '/app/**')
        .pipe(concat('app.js'))
        .pipe(insert.prepend('"use strict";\n'))
        .pipe(gulp.dest(paths.result.js));
});

/*******************************************************************************
	HTML
*******************************************************************************/

gulp.task('html', function() {
  return gulp.src(paths.src.htmlIndex)
    .pipe(gulp.dest(paths.result.root));
});


/*******************************************************************************
	IMAGES
*******************************************************************************/

gulp.task('images', function() {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.result.images));
});

/*******************************************************************************
	WEB SERVER
*******************************************************************************/
gulp.task('connect', function() {
    connect.server({
        root: 'result',
        livereload: false,
        port: 2016
    });
});
gulp.task('dataJSON', function() {
  return gulp.src('src/data/**')
    .pipe(gulp.dest('result/data'));
});


