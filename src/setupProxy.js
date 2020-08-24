const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  // 通过环境变量取url
  app.use(createProxyMiddleware([process.env.REACT_APP_API], {
    target: 'http://www.web-jshtml.cn/api/react', // 配置你要请求的服务器地址
    changeOrigin: true,
    pathRewrite: {
     [`^${process.env.REACT_APP_API}`] : ""
    }
  }))
  // 可以进行多个配置
  // app.use(proxy("", {
  //   target: 'http://www.web-jshtml.cn/api/react', // 配置你要请求的服务器地址
  //   changeOrigin: true
  // }))
}
