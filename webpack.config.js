const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          }
        }
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/less'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                paths: [path.resolve(__dirname, "node_modules")],
              }
            }
          }
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'app.css'})],
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', 'less', 'css']
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    noInfo: true,
    historyApiFallback: true,
    open: true, // open page when start
  },
};