import path from 'path';
import webpack from 'webpack';

const bowerComponentsPath = path.join(__dirname, 'bower_components');
const nodeModulesPath = path.join(__dirname, 'node_modules');
const scriptsPath = path.join(__dirname, 'assets/scripts');

const commonPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: 'common',
  minChunks: 2
  });
const resolverPlugin = new webpack.ResolverPlugin(
  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
);

let modules = {
  quiet: false,
  resolve: {
   root: [bowerComponentsPath, scriptsPath]
  },
  output: {
    filename: `modules/[name].js`
  },
  module: {
   loaders: [{
     // ES6/7 syntax and JSX transpiling out of the box
     test: /\.js$/,
     exclude: [bowerComponentsPath, nodeModulesPath],
     loader: 'babel-loader' }]
  },
  plugins: [commonPlugin, resolverPlugin]
};

export {modules};
