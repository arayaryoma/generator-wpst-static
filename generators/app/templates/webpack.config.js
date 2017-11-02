const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');

const languages = {
  "de": require('./src/assets/i18n/de.json'),
  "ja": require('./src/assets/i18n/ja.json'),
  "en": require('./src/assets/i18n/en.json'),
};

const defaultLang = 'ja';

function config(lang) {
  return {
    entry: './src/scripts/index.ts',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    output: {
      path: path.join(__dirname, 'dist', (lang === defaultLang ? '' : lang)),
      filename: lang === defaultLang ? '[name].[hash].js' : `[name]-${lang}.[hash].js`,
    },
    plugins: [
      new HtmlPlugin({
        template: 'src/index.pug',
      }),
      new ExtractTextPlugin("styles.css"),
      new I18nPlugin(
        languages[lang]
      )
    ],
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        },
        {
          test: /\.(styl)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true
                }
              },
            ]
          })
        },
        {
          test: /\.(png|jpg|svg|woff)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name]-[hash].[ext]',
              }
            }
          ],
        }
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 4000
    }
  };
}

module.exports = Object.keys(languages).map((lang) => {
  return config(lang);
});
