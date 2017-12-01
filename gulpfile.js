//Included Packages
const gulp 			= require('gulp');					// Gulp core
const sass 			= require('gulp-sass');				// Sass gulp package
const maps          = require('gulp-sourcemaps');		// Create Sass sourcemaps
const postcss       = require('gulp-postcss');          // Transforming CSS with JS plugins
const reporter      = require('postcss-reporter');      // Log PostCSS messages in the console
const stylelint     = require('stylelint');             // CSS linter
const syntax_scss 	= require('postcss-scss');			// PostCss for Sass
const csscomb 		= require('gulp-csscomb');			// CSS Comb formats the document
const minify        = require('gulp-cssnano');          // CSS Minification
const rename        = require('gulp-rename');			// Rename files
const concat        = require('gulp-concat');			// Concatenate files
const uglify        = require('gulp-uglify');			// Minify JS

// Store const for src and output directories
const paths = {
	src: {
		css:    [
					'src/scss/library/bid-client.scss',
		            'src/scss/library/management-client.scss',
		            'src/scss/library/onsite-client.scss',
		            'src/scss/library/podium-client.scss',
		            'src/scss/library/support-client.scss'
				],
		js:     [
					'src/js/core/jquery.3.2.1.min.js',
					'src/js/core/bootstrap.min.js'
				]
	},
	output: {
		css: 	 'build/css',
		js: 	 'build/js'
	} 
};

// Complile SASS files into CSS and save it to 'dist/css'
gulp.task('compileSass', function() {
	return gulp.src(paths.src.css)
			.pipe(maps.init())
			.pipe(sass())
			.pipe(minify({keepSpecialComments:0}))
			.pipe(maps.write('./'))
			.pipe(rename({
		    	suffix: '.min'
		    }))
			.pipe(gulp.dest(paths.output.css))
});

// Format SASS document (Reference: http://csscomb.com)
gulp.task('formatStyles', function() {
  return gulp.src('src/scss/**/*.scss', {base: "./"})
    		.pipe(csscomb())
    		.pipe(gulp.dest("./"));
});

// Lint CSS files (Rules: http://stylelint.io/user-guide/rules) 
gulp.task('lintStyles', function() {
	return gulp.src('src/scss/**/*.scss')
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

// JS - Concat and minify Files
gulp.task('minifyScripts', function() {
    return gulp.src(paths.src.js)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output.js));
});

// Watch files and run compileSass
gulp.task('watchFiles', function() {
	gulp.watch('src/scss/**/*.scss', ['compileSass']);
});

// Default Task
gulp.task('default', function() {
    gulp.start(['compileSass']);
});







