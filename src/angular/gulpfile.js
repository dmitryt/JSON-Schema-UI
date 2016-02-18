var path = require('path'),
	merge2 = require('merge2'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require("gulp-uglify"),
	less = require('gulp-less'),
	ngtemplate = require('gulp-ng-template'),
	minifyHtml = require("gulp-minify-html"),
	webserver = require('gulp-webserver'),
	PACKAGE_NAME = "json-schema-ui";

gulp.task('js', function(){
	merge2(
		gulp.src('bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'),
		gulp.src('bower_components/angular-sanitize/angular-sanitize.min.js'),
		gulp.src('bower_components/angular-resource/angular-resource.min.js'),
		gulp.src('bower_components/angular-ui-select/dist/select.min.js'),
		gulp.src(['app/app.js', 'app/**/*.js', '!app/**/*.spec.js']),
		gulp.src("./app/directives/**/*.html")
			.pipe(ngtemplate({
				moduleName: 'json-schema-ui',
				prefix: '/schema/'
	        }))
	)
	.pipe(concat([PACKAGE_NAME, 'js'].join('.')))
	.pipe(gulp.dest('./build/'));
});

gulp.task('css', function(){
	merge2(
		gulp.src('bower_components/angular-ui-select/dist/select.min.css'),
		gulp.src('app/directives/field/field.less').pipe(less())
	)
	.pipe(concat([PACKAGE_NAME, 'css'].join('.')))
	.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function(){
	gulp.watch('app/**/*.js', ['js']);
	gulp.watch('app/directives/**/*.html', ['js']);
	gulp.watch('app/**/*.less', ['css']);
});

gulp.task('webserver', ['build', 'watch'], function() {
    gulp.src('./')
    .pipe(webserver({
        livereload: {
			port: 35730,
			enable: true
		},
		port: 8001
    }));
});

gulp.task('build', ['js', 'css']);
gulp.task('default', ['build', 'watch']);
