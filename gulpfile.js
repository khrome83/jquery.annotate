var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minifycss'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    util = require('gulp-util');

// Options
var options = {
	autoprefixer: {
		map: true,
		from: 'placeholder',
		to: 'style.min.css'
	},
	rename: {
		suffix: '.min'
	}
};

var paths = {
 	scripts: [
	 	'src/*.js', 
		'!src/vendor/*.js'
	],
	styles: [
		'src/*.css'
	]
};

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
		.pipe(rename(options.rename))
        .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
		.pipe(autoprefixer(["last 1 version", "> 1%", "ie 8", "ie 7"], options.autoprefixer))
		.pipe(minifycss())
		.pipe(rename(options.rename))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['connect', 'styles', 'scripts'], function() {
    // Watch .scss files
    gulp.watch(paths.sass, ['styles']);

    // Watch .js files
    gulp.watch(paths.scripts, ['scripts']);

    // Watch .html files  
    gulp.watch(paths.html, ['html']);
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(connect.reload())
});

gulp.task('connect', function() {
    connect.server(options.server);
});

gulp.task('default', function() {
    gulp.start('watch');
});

