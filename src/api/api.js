import service from "../utils/request";
export function login(data) {
  return service.request({
    url: "/login/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
export function register(data) {
  return service.request({
    url: "/register/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
export function getCode(data) {
  return service.request({
    url: "/getSms/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
// 添加部门接口
export function depAdd(data) {
  return service.request({
    url: "/department/add/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
// 获取部门列表接口
export function getDepList(data) {
  return service.request({
    url: "/department/list/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
// 删除部门
export function depDel(data) {
  return service.request({
    url: "/department/delete/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
// 部门详情
export function depDetail(data) {
  return service.request({
    url: "/department/detailed/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
export function depEdit(data) {
  return service.request({
    url: "/department/add/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
export function depStatus(data) {
  return service.request({
    url: "/department/status/",
    method: "post",
    // get请求时参数
    // params: data,
    // post请求参数
    data,
  });
}
