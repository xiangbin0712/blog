const nav = require('../nav');
const sidebar = require('../sidebar');
module.exports = {
  nav,
  sidebar,
  type: 'blog',
  mode: 'auto', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
  modePicker: true, // 默认 true，false 不显示模式调节按钮，true 则显示
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: '分类', // 默认文案
    },
    tag: {
      location: 3,
      text: 'Tag',
    },
  },
  friendLink: [
    {
      title: '午后南杂',
      desc: 'Enjoy when you can, and endure when you must.',
      email: '1156743527@qq.com',
      link: 'https://www.recoluan.com',
    },
    {
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
      link: 'https://vuepress-theme-reco.recoluan.com',
    },
  ],
  logo: '', //首页topbar logo
  search: true,
  // sidebar: 'auto', //在所有页面中启用自动生成侧栏
  smoothScroll: false, //页面滚动
  searchMaxSuggestions: 10,
  lastUpdated: 'Last Updated',
  authorAvatar: '/avatar.png',
  // 备案
  record: 'ICP 备案文案',
  recordLink: 'ICP 备案指向链接',
  cyberSecurityRecord: '公安部备案文案',
  cyberSecurityLink: '公安部备案指向链接',
  // 项目开始时间，只填写年份
  startYear: '',
  // author
  author: 'Mine',
  huawei: false, // 华为文案
};
