var syntax         = 'scss'; // Syntax: sass or scss

var gulp          = require('gulp')
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify'),
	imageResize   = require('gulp-image-resize'),
	imagemin      = require('gulp-imagemin'),
	del           = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// Main scripts
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// Pages Scripts

{
	gulp.task('page-home-scripts', function() {
		return gulp.src([
			'app/libs/jquery.mask.min.js',
			'app/libs/country-code/intlTelInput-jquery.js',
			'app/libs/slick/slick.min.js',
			'app/libs/bootstrap/js/bootstrap.min.js',
			'app/js/src/pages/page-home/home.js',
		])
		.pipe(concat('home.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js/dest/pages/page-home'))
		.pipe(browserSync.reload({ stream: true }))
	});
}

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));

	// Page scripts
	gulp.watch(['app/js/src/pages/page-home/home.js'], gulp.parallel('page-home-scripts'));
});

gulp.task('default', gulp.parallel(
	'styles',
	'scripts',
	'page-home-scripts',
	'browser-sync',
	'watch'
));
