const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Entry point
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js', // Output file
    },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transpile .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for JSX and modern JS
        },
      },
      {
        test: /\.css$/, // Support for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Support for images
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files
    },
    historyApiFallback: false,//ack to index.html for SPA
    compress: true, // Enable gzip compression
    port: 3000, // Dev server port
  },
  mode: 'development', // Development mode
};
