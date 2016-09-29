var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
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
		new webpack.NoErrorsPlugin()
	]
};
