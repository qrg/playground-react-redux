const {resolve} = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = resolve(__dirname, 'src');
const DIST = resolve(__dirname, 'public');
const DEV_SERVER_PORT = 9000;

module.exports = {
  mode: 'development',

  entry: {
    main: resolve(SRC, 'index.js')
  },

  output: {
    sourcePrefix: '  ',
    path: resolve(DIST, 'scripts'),
    filename: 'bundle.js',
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            outputPath: 'icons/'
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            outputPath: 'images/'
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Try Redux',
      template: `${SRC}/index.html`
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles/main.css'
    })
  ],

  devServer: {
    host: 'localhost',
    contentBase: DIST,
    port: DEV_SERVER_PORT,
    watchContentBase: true,
    overlay: true
  }
};
