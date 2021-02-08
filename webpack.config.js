var path = require('path');

module.exports = {
  entry: './src/main/webapp/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/main/webapp/dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/main/webapp/dist'),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },
	{
	  test: /\.css$/i,
	  use: ["style-loader", "css-loader"]
	}
  ]
  }
};