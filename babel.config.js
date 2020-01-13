module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  }
  // resolve: { alias: { vue: 'vue/dist/vue.esm.js' } }
};
