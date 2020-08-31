import axios from 'axios'
// cookies
import {getToken, getUsername} from './cookies'
// antd
import {message} from "antd";
// 1、创建实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000
})
// 2、请求拦截
service.interceptors.request.use(function (config) {
  // 请求之前做些什么
  config.headers['Token'] = getToken()
  config.headers['Username'] = getUsername()
  return config
}, function (error) {
  return error
})
// 3、相应拦截
service.interceptors.response.use(function (response) {
  // 对相应数据做点什么
  const {data} = response
  if (data.resCode !== 0) {
    // 全局统一处理错误提示
    message.error(data.message)
    /*
    *  可以通过判断resCode的值来做不同的事情
    */
    // 调用接口的第二个参数，如果没有，调用catch方法
    return Promise.resolve(data)
  } else {
    return data
  }
}, function (error) {
  // 接口报错执行
  // console.log(error, 'error')
  message.error(error)
  return error
})

export default service
