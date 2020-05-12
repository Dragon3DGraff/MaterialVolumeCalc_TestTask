const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require( 'terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () =>{
	const config = {
		splitChunks: {
			chunks: "all"
		} 
	}
	if(isProd){
		config.minimizer = [
			new OptimizeCSSAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
	mode: 'development',
	entry: {
		volumeCalc: './src/index.js'
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: isDev
	},
	optimization: optimization(),
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
		title: "volumeCalc",
		minify: isProd
		}),
		new CopyWebpackPlugin([
			{ from: path.resolve( __dirname, 'src/coswick-oak-natural.jpg'),
			 to: path.resolve( __dirname, 'dist/coswick-oak-natural.jpg')
			},
			{ from: path.resolve( __dirname, 'src/brick-texture.jpg'),
			 to: path.resolve( __dirname, 'dist/brick-texture.jpg')
			},
			{ from: path.resolve( __dirname, 'src/crossed-out.png'),
			to: path.resolve( __dirname, 'dist/crossed-out.png')
		   },
		   { from: path.resolve( __dirname, 'src/empty.png'),
			to: path.resolve( __dirname, 'dist/empty.png')
		   },
		   { from: path.resolve( __dirname, 'src/tile.jpg'),
			to: path.resolve( __dirname, 'dist/tile.jpg')
		   }
		  ]),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					'css-loader'
				]
			},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
					'file-loader',
					],
				},
		]
	}
}