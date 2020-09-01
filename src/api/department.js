import request from '../utils/request'

// 添加部门
export const addDepartment = (data) => {
  return request.request({
    url: '/department/add/',
    method: 'post',
    data
  })
}

// 获取部门列表
export const getDepartmentList = (data) => {
  return request.request({
    url: '/department/list/',
    method: 'post',
    data
  })
}
