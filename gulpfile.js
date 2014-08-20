var gulp = require("gulp"),
	plugins = require("gulp-load-plugins")();

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

gulp.task("scripts", function () {
	"use strict";
	return gulp.src(paths.scripts)
		.pipe(plugins.jshint(".jshintrc"))
		.pipe(plugins.jshint.reporter("jshint-stylish"))
		.pipe(gulp.dest("./build"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename(options.rename))
		.pipe(gulp.dest("./build"))
		.pipe(plugins.filesize());
});

gulp.task("styles", function () {
	"use strict";
	return gulp.src(paths.styles)
		.pipe(plugins.autoprefixer(["last 1 version", "> 1%", "ie 8", "ie 7"], options.autoprefixer))
		.pipe(gulp.dest("./build"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename(options.rename))
		.pipe(gulp.dest("./build"))
		.pipe(plugins.filesize());
});

gulp.task("clean", function () {
	"use strict";
	return gulp.src("./build", options.clean)
		.pipe(plugins.clean());
});

gulp.task("default", ["clean"], function () {
	"use strict";
	gulp.start("watch");
});

gulp.task("watch", ["styles", "scripts"], function () {
	"use strict";

	// Watch .css files
	gulp.watch(paths.styles, ["styles"]);

	// Watch .js files
	gulp.watch(paths.scripts, ["scripts"]);
});