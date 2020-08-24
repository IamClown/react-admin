import axios from 'axios'

// 1、创建实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000
})
// 2、请求拦截
service.interceptors.request.use(function (config) {
  // 请求之前做些什么
  return config
}, function (error) {
  return error
})
// 3、相应拦截
service.interceptors.response.use(function (response) {
  // 对相应数据做点什么
  return response
}, function (error) {
  return error
})

export default service
