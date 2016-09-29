import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gls from 'gulp-live-server';
import util from 'gulp-util';

gulp.task('lint', () => {
	return gulp
		.src(['service/**/*.js', 'web/**/*.js', 'web/**/*.jsx'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('develop', () => {
	const server = gls.new('service/index.js');
	server.start();

	gulp.watch(['service/**/*.js'], () => {
		util.log('[gulp-live-server]', 'Change detected. Restarting server...');
		server.start.bind(server)();
	});
});

gulp.task('default', ['develop']);
