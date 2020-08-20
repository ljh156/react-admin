import axios from "axios";
import { message } from "antd";
var service = axios.create({
  baseURL: "/devApi",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Token"] = sessionStorage.getItem("token");
    config.headers["Username"] = sessionStorage.getItem("username");

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response;
    // 只要resCode不为0，就说明响应不对
    if (data.resCode !== 0) {
      message.info(data.message);
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default service;
