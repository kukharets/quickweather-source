const glob = require('glob')
const path = require('path');
const HWP = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
  src: path.join(__dirname, 'src')
}

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
    minimize: true,
  },
};

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
};

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.join(
      __dirname,
      'build',
    ),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', postCSSLoader, 'sass-loader'],
      },
      {
        test: /\.module\.scss$/,
        use: ['style-loader', CSSModuleLoader, postCSSLoader, 'sass-loader'],
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.scss?$/,
        },
        loader: 'svg-url-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/,
        },
        loader: '@svgr/webpack',
      },
      {
        test: /\.png|webp$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/src/assets/quickweather.ico'),
        to: 'quickweather.ico',
      },
    ]),
    new HWP({ template: path.join(__dirname, '/src/index.html') }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!.git',
        '!.git/**/*',
        '!.git/**',
        '!.git/**/**/*',
        '!.gitattributes',
      ],
    }),
    new Dotenv()
  ],
};
