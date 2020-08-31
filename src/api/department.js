import request from '../utils/request'

// 添加部门
export const addDepartment = (data) => {
  return request.request({
    url: '/department/add/',
    method: 'post',
    data
  })
}
