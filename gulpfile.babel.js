import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gls from 'gulp-live-server';
import util from 'gulp-util';
import webpackStream from 'webpack-stream';

const webpackConfig = require('./webpack.config.js');

gulp.task('lint', () => {
	return gulp
		.src(['service/**/*.js', 'web/**/*.js', 'web/**/*.jsx'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('bundle', ['lint'], () => {
	return gulp
		.src('./web/app.jsx')
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest('public/'));
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
