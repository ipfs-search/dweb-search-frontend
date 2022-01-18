const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: smp.wrap({
  }),
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'ipfs-search.com',
    },
  },
};
