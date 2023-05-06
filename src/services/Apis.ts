const apiConfig = {
  // 登录
  login: {
    url: 'user/login',
    method: 'get',
  },
  // 首页列表
  homeList: {
    url: '/home/homeList',
    method: 'get',
  },
  // 文章列表
  articleDetail: {
    url: '/article/articleDetail',
    method: 'get',
  },
  // 商品列表
  goodsList: {
    url: '/goods/goodsList',
    method: 'get',
  },
  top10Category: {
    url: '/goods/top10Category',
    method: 'get',
  },
  messageList: {
    url: '/message/messageList',
    method: 'get',
  },
  unread: {
    url: '/message/unread',
    method: 'get',
  },
  accountInfo: {
    url: '/mine/accountInfo',
    method: 'get',
  },
  noteList: {
    url: '/mine/noteList',
    method: 'get',
  },
  collectionList: {
    url: '/mine/collectionList',
    method: 'get',
  },
  favorateList: {
    url: '/mine/favorateList',
    method: 'get',
  },
};

export default apiConfig;
