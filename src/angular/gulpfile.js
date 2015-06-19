var path = require('path'),
	merge2 = require('merge2'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require("gulp-uglify"),
	less = require('gulp-less'),
	ngtemplate = require('gulp-ng-template'),
	minifyHtml = require("gulp-minify-html"),
	PACKAGE_NAME = "adstream-json-schema-ui";

gulp.task('js', function(){
	merge2(
		gulp.src('bower_components/angular-ui-select/dist/select.js'),
		gulp.src(['app/app.js', 'app/**/*.js', '!app/**/*.spec.js']),
		gulp.src("./app/directives/**/*.html")
			.pipe(ngtemplate({
				moduleName: 'adstreamJsonSchemaUI',
				prefix: '/schema/'
	        }))
	)
	.pipe(concat([PACKAGE_NAME, 'js'].join('.')))
	.pipe(gulp.dest('./build/'));
});

gulp.task('css', function(){
	merge2(
		gulp.src('bower_components/angular-ui-select/dist/select.css'),
		gulp.src('app/styles/index.less')
			.pipe(less({
				paths: ['app/styles/less']
			}))
	)
	.pipe(concat([PACKAGE_NAME, 'css'].join('.')))
	.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['js', 'css'], function(){
	gulp.watch('app/**/*.js', ['js']);
	gulp.watch('app/directives/**/*.html', ['js']);
	gulp.watch('app/**/*.less', ['css']);
});