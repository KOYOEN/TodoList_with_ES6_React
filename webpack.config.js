const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/js/app.js', './src/js/footer.js'],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/style.css'})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};