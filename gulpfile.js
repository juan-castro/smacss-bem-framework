//Included Packages
const gulp 			= require('gulp');					// Gulp core
const sass 			= require('gulp-sass');				// Sass gulp package
const maps          = require('gulp-sourcemaps');		// Create Sass sourcemaps
const postcss       = require('gulp-postcss');          // Transforming CSS with JS plugins
const path          = require('path');                  // Node.JS path module
const reporter      = require('postcss-reporter');      // Log PostCSS messages in the console
const stylelint     = require('stylelint');             // CSS linter
const syntax_scss 	= require('postcss-scss');			// PostCss for Sass
const csscomb 		= require('gulp-csscomb');			// CSS Comb formats the document
const minify        = require('gulp-cssnano');          //CSS Minification


// Store const for src and output directories
const root = __dirname;
const paths = {
  src: {
    css:     path.join(root, 'src/sass/sass-iaa/**/*.scss')
  },
  output: {
  	css: 	 path.join(root, 'build/css')
  } 
};

// Complile SASS files into CSS and save it to 'dist/css'
gulp.task('compileSass', function() {
	return gulp.src(paths.src.css)
			.pipe(maps.init())
			.pipe(sass())
			.pipe(minify({keepSpecialComments:0}))
			.pipe(maps.write('./'))
			.pipe(gulp.dest(paths.output.css))
});

// Format SASS document (Reference: http://csscomb.com)
gulp.task('formatStyles', function() {
  return gulp.src(paths.src.css, {base: "./"})
    		.pipe(csscomb())
    		.pipe(gulp.dest("./"));
});

// Lint CSS files (Rules: http://stylelint.io/user-guide/rules) 
gulp.task('lintStyles', function() {
	return gulp.src(paths.src.css)
		.pipe(postcss([
			stylelint(),
			reporter({
				clearReportedMessages: true
			}),
		],
		{
			syntax: syntax_scss
		}
	));
});

// Watch files and run compileSass
gulp.task('watchFiles', function() {
	gulp.watch(paths.src.css, ['compileSass']);
});


// Default Task
gulp.task('default', function() {
    gulp.start(['compileSass']);
})


