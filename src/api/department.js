import request from '../utils/request'

// 添加部门
export const addDeparment = (data) => {
  return request.request({
    url: '/department/add/',
    method: 'post',
    data
  })
}
