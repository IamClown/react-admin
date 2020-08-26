const key = 'adminToken'

export const setToken = (value) => {
  sessionStorage.setItem(key, value)
}
export const getToken = () => {
  return sessionStorage.getItem(key)
}
