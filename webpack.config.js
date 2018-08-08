var path = require('path');

module.exports = {
    mode: 'development',
    entry: "./js/index.js",
    context: path.resolve(__dirname, 'src'),
    output: {
      filename: "bundle.js"
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@ava/stage-4']
              }
            }
          }
        ]
    },
    watch: true
}