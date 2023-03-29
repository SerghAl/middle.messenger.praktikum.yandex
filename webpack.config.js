// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const commonConfig = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),

		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};

const developmentConfig = {
	devServer: {
		open: true,
		host: 'localhost',
	},
};

module.exports = () => {
	switch (isProduction) {
		case false:
			commonConfig.mode = 'development';
			return merge(commonConfig, developmentConfig);
		case true:
			commonConfig.mode = 'production';
			return merge(commonConfig);
		default:
			throw new Error('No matching configuration was found!');
	}
};
