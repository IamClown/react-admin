import UrlKey from '@/api/urlKey.js'
import request from '@/utils/request'

export const getTableList = (params) => {
  return request.request({
    url: UrlKey[params.url],
    method: params.method || 'post',
    data: params.data
  })
}
