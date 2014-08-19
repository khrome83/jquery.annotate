var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-minify-css"),
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    clean = require("gulp-clean"),
    concat = require("gulp-concat"),
    util = require("gulp-util");

// Options
var options = {
	autoprefixer: {
		map: true,
		from: "placeholder",
		to: "style.min.css"
	},
	rename: {
		suffix: ".min"
	},
	clean: {
		read: false
	}
};

var paths = {
 	scripts: [
	 	"src/*.js"
	],
	styles: [
		"src/*.css"
	]
};

gulp.task("scripts", function() {
	"use strict";
	return gulp.src(paths.scripts)
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("jshint-stylish"))
		.pipe(gulp.dest("./build"))
        .pipe(uglify())
		.pipe(rename(options.rename))
        .pipe(gulp.dest("./build"));
});

gulp.task("styles", function() {
	"use strict";
    return gulp.src(paths.styles)
		.pipe(autoprefixer(["last 1 version", "> 1%", "ie 8", "ie 7"], options.autoprefixer))
		.pipe(gulp.dest("./build"))
		.pipe(minifycss())
		.pipe(rename(options.rename))
        .pipe(gulp.dest("./build"));
});

gulp.task("clean", function() {
	"use strict";
	return gulp.src("./build", options.clean)
		.pipe(clean());
});

gulp.task("default", ["clean"], function() {
	"use strict";
	gulp.start("watch");
});

gulp.task("watch", ["styles", "scripts"], function() {
	"use strict";

    // Watch .css files
    gulp.watch(paths.styles, ["styles"]);

    // Watch .js files
    gulp.watch(paths.scripts, ["scripts"]);
});