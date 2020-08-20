import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../utils/sessionStorage";
// 私有路由组件，用于返回route标签，判断是否存在token，实现登陆拦截
const index = (props) => {
  console.log("====================================");
  console.log(props);
  console.log("====================================");
  // 解构赋值再加一个：表示给component重命名为Component,...rest表示将剩余的解构
  const { component: Component, ...rest } = props;
  console.log("重命名为:", Component);
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        // 判断sessionstorage中有没有存储token
        return getToken() ? <Component {...routeProps} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default index;
