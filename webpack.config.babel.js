import {resolve} from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';

const SRC = resolve(__dirname, 'src');
const DIST = resolve(__dirname, 'public');
const DEV_SERVER_PORT = 9000;

export default {
  mode: 'development',

  entry: [resolve(SRC, 'index.js'), resolve(SRC, 'styles', 'index.sass')],

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
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        )
      },
      {
        test: /\.(sass|scss)$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        )
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
    new CleanPlugin([DIST], {
      watch: true
    }),
    new HtmlPlugin({
      title: `Try Redux`,
      template: `${SRC}/index.html`
    }),
    new ExtractTextPlugin('styles/main.css', {allChunks: true})
  ],

  devServer: {
    host: 'localhost',
    contentBase: DIST,
    port: DEV_SERVER_PORT,
    watchContentBase: true,
    overlay: true
  }
};
