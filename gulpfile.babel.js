import eslint from 'gulp-eslint';
import gulp from 'gulp';

gulp.task('lint', () => {
	return gulp
		.src(['service/**/*.js', 'web/**/*.js', 'web/**/*.jsx'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});
