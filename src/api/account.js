import service from "../utils/request";
// 获取验证码
export const getCode = (data) => {
  return service.request({
    url: '/getSms/',
    method: 'post',
    data
  })
}
// 登录
export const DoLogin = (data) => {
  return service.request({
    url: '/login/',
    method: 'post',
    data
  })
}
// 注册
export const DoRegister = (data) => {
  return service.request({
    url: '/register/',
    method: 'post',
    data
  })
}
