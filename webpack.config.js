var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080/',
		'webpack/hot/only-dev-server',
		'app.jsx'
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'web'],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	devtool: 'inline-source-map',
	devServer: {
		hot: true,
		proxy: {
			'*': 'http://localhost:' + (process.env.POWERGRID_PORT || 47001)
		},
		host: 'localhost'
	}
};