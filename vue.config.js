module.exports = {
  // 配置跨域代理
  devServer: {
    // Paths
    host: 'localhost',
    port: '8082',
    https: false,
    open: true,
    proxy: {
      '/api/*': {
        target: 'http://39.97.113.252:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
  }
}