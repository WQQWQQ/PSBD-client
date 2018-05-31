const webpack = require('webpack');
const path = require('path');
const config = require('../config');
const library = '[name]_lib';

module.exports = {
  entry: {
    vendors: ['vue','vue-router','vuex','axios','iview','echarts','lodash']
  },
  output: {
    filename: '[name].dll.js',
    path:process.env.NODE_ENV === 'production' ? config.build.dllPath : config.dev.dllPath,
    library
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    }),
  ],
};