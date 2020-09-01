const themeConfig = require('./config/themeConfig');
const head = require('./config/head');
module.exports = {
  title: 'Mime',
  description: 'mine の blog',
  dest: 'public',
  head,
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true,
  },
};
