const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Compile SCSS to CSS
function compileSass() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
}

// Start BrowserSync server
function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  // Watch SCSS files for changes
  gulp.watch("./scss/**/*.scss", compileSass);
  // Gulp watches

  // Watch HTML and JS files for changes and reload
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

// Define tasks
gulp.task("sass", compileSass);
gulp.task("build", gulp.series(compileSass));
gulp.task("default", gulp.series(compileSass, serve));

gulp.task("watch", function () {
  gulp.watch("./scss/**/*.scss", gulp.series(compileSass)); // Corrected SCSS watch
});
