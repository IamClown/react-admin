import cookies from 'react-cookies'

const Token = 'adminToken'
const user = 'username'
// 存储token
export const setToken = (value) => {
  cookies.save(Token, value)
}

export const getToken = () => {
  return cookies.load(Token)
}
// 存储用户名
export const setUsername = (value) => {
  cookies.save(user, value)
}
export const getUsername = () => {
  return cookies.load(user)
}
