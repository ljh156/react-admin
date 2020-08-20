const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/devApi/", {
      target: "http://www.web-jshtml.cn/api/react",
      changeOrigin: true,
      pathRewrite: {
        "^/devApi": "",
      },
    })
  );
  /*
  http://localhost:3000/devApi/login/,匹配到devApi开始做代理
  /devApi/login=》/login
  替换之后的地址http://www.web-jshtml.cn/api/react/login
  */

  //   app.use(
  //     proxy("/fans/**", {
  //       target: "https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/",
  //       changeOrigin: true
  //     })
  //   );
};
