const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./background.js'],
  plugins : [    
    new CleanWebpackPlugin(),
    new CopyPlugin({
        patterns: [
          { 
            from: 'build/background.js', 
            to: '../../build/'
          },        
        ],
      }),
  ],
  devtool: 'inline-source-map', 
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'background.js',
    libraryTarget : 'umd',
  },
  module: {},
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
