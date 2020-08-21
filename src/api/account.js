import service from "../utils/request";
export const test = (data) => {
  return service.request({
    url: '/login',
    method: 'post',
    data
  })
}
