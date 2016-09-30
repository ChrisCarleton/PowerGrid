import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gls from 'gulp-live-server';
import mocha from 'gulp-mocha';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import util from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackStream from 'webpack-stream';

const webpackConfig = require(
	process.env.NODE_ENV === 'production' 
	? './webpack/production.config.js'
	: './webpack/development.config.js');

gulp.task('lint', () => {
	return gulp
		.src(['service/**/*.js', 'web/**/*.js', 'web/**/*.jsx'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('test', () => {
	return gulp
		.src(['tests/**/*.tests.js'])
		.pipe(mocha());
});

gulp.task('bundle', ['lint'], () => {
	return gulp
		.src('./web/app.jsx')
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest('public/'));
});

gulp.task('clean', () => {
	return gulp
		.src(['public/bundle.min.js'])
		.pipe(clean({ read: false }));
});

gulp.task('minify', ['clean', 'bundle'], () => {
	return gulp
		.src('public/bundle.js')
		.pipe(uglify())
		.pipe(rename('bundle.min.js'))
		.pipe(gulp.dest('public/'));
});

gulp.task('dev-server', done => {
	const server = gls.new('service/index.js');
	server.start();

	gulp.watch(['service/**/*.js', 'service/index.pug'], () => {
		util.log('[gulp-live-server]', 'Change detected. Restarting server...');
		server.start.bind(server)();
	});

	new WebpackDevServer(webpack(webpackConfig), {
		publicPath: '/public/',
		stats: {
			colors: true
		},
		hot: true,
		proxy: {
			'**': 'http://localhost:28988'
		}
	})
	.listen(8080, 'localhost', err => {
		if (err) throw new util.PluginError('webpack-dev-server', err);

		util.log('[webpack-dev-server]', 'Webpack dev server online at http://localhost:8080/');

		done();
	});
});

gulp.task('default', ['dev-server']);
