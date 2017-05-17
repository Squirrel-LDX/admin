module.exports = {
  name: 'Squirrel',
  prefix: 'squirrel',
  footerText: 'Squirrel Admin  © 2017 lidongjie@gmail.com',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  baseURL: 'http://localhost:8000/api/v1',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [
    'http://localhost:7000',
    'http://192.168.1.122:8080',
    'http://localhost:4000',
  ],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: '/user/login',
    userLogout: '/user/logout',
    userInfo: '/userInfo',
    users: '/users',
    user: '/user/:id',
    dashboard: '/dashboard',
    good: '/good/:id',
    goods: '/goods',
  },
}
