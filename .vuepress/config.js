const themeConfig = require('./config/themeConfig');
const head = require('./config/head');
const plugins = require('./config/plugins');
module.exports = {
  title: 'Mime',
  description: 'mine の blog',
  dest: 'root', // vuepress 生成目录
  base: '/blog/',
  head,
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true,
  },
  plugins,
};
