module.exports = {
  entry: './app/src/js/main',
  output: {
    path: './',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3333/'
  },
  devServer: {
    inline: true,
    port: 3333,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
