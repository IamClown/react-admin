import service from "../utils/request";
export const getCode = (data) => {
  return service.request({
    url: '/getSms/',
    method: 'post',
    data
  })
}
